import { useState } from "react";

function ProfileSettings() {

  const [profile, setProfile] = useState({
    name: "Rupali Bandre",
    email: "hr@company.com",
    designation: "HR Manager",
  });

  function handleChange(e) {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });

  }

  function saveProfile() {

    localStorage.setItem(
      "recruiter_profile",
      JSON.stringify(profile)
    );

    alert("Profile Saved Successfully ✅");

  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recruiter Profile
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          name="designation"
          value={profile.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
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