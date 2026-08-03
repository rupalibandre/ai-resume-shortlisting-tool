import { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaCamera,
  FaSave,
} from "react-icons/fa";

import api from "../../services/api";


function ProfileSettings() {

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    profile_image: "",
  });


  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    fetchProfile();

  }, []);



  async function fetchProfile(){

    try{

      const response = await api.get(
        "/settings/profile"
      );

      setProfile(response.data);

      setPreview(
        response.data.profile_image
      );


    }catch(error){

      console.log(error);

    }

  }



  function handleChange(e){

    setProfile({

      ...profile,

      [e.target.name]: e.target.value,

    });

  }



  function handleImage(e){

    const file = e.target.files[0];


    if(file){

      setImage(file);

      setPreview(
        URL.createObjectURL(file)
      );

    }

  }



  async function uploadImage(){


    if(!image){

      return profile.profile_image;

    }


    const formData = new FormData();


    formData.append(
      "image",
      image
    );


    const response = await api.post(

      "/settings/profile/upload",

      formData,

      {

        headers:{
          "Content-Type":
          "multipart/form-data",
        },

      }

    );


    return response.data.profile_image;


  }



  async function saveProfile(){


    try{


      setLoading(true);



      let imageURL =
      profile.profile_image;



      if(image){

        imageURL =
        await uploadImage();

      }



      await api.put(

        "/settings/profile",

        {

          recruiter_name:
          profile.name,


          recruiter_email:
          profile.email,


          recruiter_phone:
          profile.phone,


          recruiter_designation:
          profile.designation,

        }

      );



      await fetchProfile();



      window.dispatchEvent(
        new Event("profileUpdated")
      );


      alert(
        "Profile Updated Successfully ✅"
      );



    }catch(error){


      console.log(error);


      alert(
        "Profile Update Failed ❌"
      );


    }finally{

      setLoading(false);

    }

  }



  return (

    <div className="
      bg-white/10
      backdrop-blur-xl
      border border-white/10
      rounded-3xl
      p-8
      shadow-xl
    ">


      <div className="flex items-center gap-4 mb-8">

        <div className="
          bg-blue-600
          p-4
          rounded-2xl
          text-2xl
        ">

          <FaUser />

        </div>


        <div>

          <h2 className="
            text-3xl
            font-bold
          ">

            Recruiter Profile

          </h2>


          <p className="
            text-gray-400
          ">

            Update your personal information

          </p>


        </div>


      </div>



      <div className="
        flex
        flex-col
        items-center
        mb-10
      ">


        <div className="
          relative
        ">


          <img

            src={
              preview ||
              "https://i.pravatar.cc/300"
            }

            className="
              w-36
              h-36
              rounded-full
              object-cover
              border-4
              border-blue-500
              shadow-xl
            "

          />


          <label className="
            absolute
            bottom-1
            right-1
            bg-blue-600
            p-3
            rounded-full
            cursor-pointer
            hover:bg-blue-700
          ">


            <FaCamera />


            <input

              type="file"

              accept="image/*"

              hidden

              onChange={handleImage}

            />


          </label>


        </div>



        <p className="
          text-gray-400
          mt-4
        ">

          Click camera to change photo

        </p>



      </div>      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>

          <label className="text-gray-300 mb-2 block">
            Full Name
          </label>

          <div className="relative">

            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Recruiter Name"
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900
                border
                border-white/10
                outline-none
                focus:border-blue-500
              "
            />

          </div>

        </div>

        <div>

          <label className="text-gray-300 mb-2 block">
            Email Address
          </label>

          <div className="relative">

            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              placeholder="Email"
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900
                border
                border-white/10
                outline-none
                focus:border-blue-500
              "
            />

          </div>

        </div>

        <div>

          <label className="text-gray-300 mb-2 block">
            Phone Number
          </label>

          <div className="relative">

            <FaPhone className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900
                border
                border-white/10
                outline-none
                focus:border-blue-500
              "
            />

          </div>

        </div>

        <div>

          <label className="text-gray-300 mb-2 block">
            Designation
          </label>

          <div className="relative">

            <FaBriefcase className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              name="designation"
              value={profile.designation}
              onChange={handleChange}
              placeholder="Designation"
              className="
                w-full
                pl-12
                pr-4
                py-4
                rounded-xl
                bg-slate-900
                border
                border-white/10
                outline-none
                focus:border-blue-500
              "
            />

          </div>

        </div>

      </div>

      <div className="flex justify-end mt-10">

        <button
          onClick={saveProfile}
          disabled={loading}
          className="
            flex
            items-center
            gap-3
            bg-blue-600
            hover:bg-blue-700
            px-8
            py-4
            rounded-xl
            font-semibold
            transition-all
            disabled:opacity-60
          "
        >

          <FaSave />

          {

            loading

            ?

            "Saving..."

            :

            "Save Profile"

          }

        </button>

      </div>

    </div>

  );

}

export default ProfileSettings;