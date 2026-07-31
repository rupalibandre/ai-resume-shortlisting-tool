import { useEffect, useState } from "react";
import api from "../services/api";
import NotificationBell from "./NotificationBell";

function Navbar() {

  const [profile, setProfile] = useState({
    name: "",
    profile_image: "",
  });

  useEffect(() => {

    loadProfile();

    window.addEventListener("profileUpdated", loadProfile);

    return () => {

      window.removeEventListener(
        "profileUpdated",
        loadProfile
      );

    };

  }, []);

  async function loadProfile() {

    try {

      const res = await api.get("/settings/profile");

      setProfile(res.data);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="flex justify-between items-center mb-8">

      <div>

        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mt-2">
          {profile.name}
        </p>

      </div>

      <div className="flex items-center gap-4">

        <NotificationBell />

        <img
          src={
            profile.profile_image ||
            "https://i.pravatar.cc/150"
          }
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
        />

      </div>

    </div>

  );

}

export default Navbar;