import { useEffect, useState } from "react";
import api from "../../services/api";

function ProfileSettings() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    designation: "",
    profile_image: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      const res = await api.get("/settings/profile");

      setProfile(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  function handleChange(e) {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  }

  async function saveProfile() {

    try {

      await api.put("/settings/profile", {

        recruiter_name: profile.name,
        recruiter_email: profile.email,
        recruiter_designation: profile.designation,

      });

      if (image) {

        const formData = new FormData();

        formData.append("image", image);

        const upload = await api.post(
          "/settings/profile/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        profile.profile_image = upload.data.profile_image;

      }

      await loadProfile();

      window.dispatchEvent(new Event("profileUpdated"));

      alert("Profile Updated Successfully ✅");

    } catch (err) {

      console.log(err);

      alert("Unable to update profile");

    }

  }

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recruiter Profile
      </h2>

      <div className="flex justify-center mb-6">

        <img

          src={

            image
              ? URL.createObjectURL(image)
              : profile.profile_image ||
                "https://i.pravatar.cc/150"

          }

          className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"

        />

      </div>

      <input

        type="file"

        accept="image/*"

        onChange={(e) => setImage(e.target.files[0])}

        className="mb-6"

      />

      <div className="space-y-5">

        <input

          type="text"

          name="name"

          value={profile.name}

          onChange={handleChange}

          className="w-full bg-slate-900 rounded-xl p-4"

        />

        <input

          type="email"

          name="email"

          value={profile.email}

          onChange={handleChange}

          className="w-full bg-slate-900 rounded-xl p-4"

        />

        <input

          type="text"

          name="designation"

          value={profile.designation}

          onChange={handleChange}

          className="w-full bg-slate-900 rounded-xl p-4"

        />

        <button

          onClick={saveProfile}

          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"

        >

          Save Profile

        </button>

      </div>

    </div>

  );

}

export default ProfileSettings;