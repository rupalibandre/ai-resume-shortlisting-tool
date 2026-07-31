import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaFileUpload,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useEffect, useState } from "react";
import api from "../services/api";

function Sidebar() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    recruiter: "",
    designation: "",
    company: "",
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

      const p = await api.get("/settings/profile");

      const c = await api.get("/settings/company");

      setProfile({

        recruiter: p.data.name,
        designation: p.data.designation,
        profile_image: p.data.profile_image,

        company: c.data.name,

      });

    } catch (err) {

      console.log(err);

    }

  }

  const menu = [

    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/dashboard",
    },

    {
      title: "Jobs",
      icon: <FaBriefcase />,
      path: "/jobs",
    },

    {
      title: "Candidates",
      icon: <FaUsers />,
      path: "/candidates",
    },

    {
      title: "Upload Resume",
      icon: <FaFileUpload />,
      path: "/upload-resume",
    },

    {
      title: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },

    {
      title: "Settings",
      icon: <FaCog />,
      path: "/settings",
    },

  ];

  function handleLogout() {

    localStorage.removeItem("token");

    navigate("/");

  }

  return (

    <div className="w-72 h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-6 fixed">

      <h1 className="text-3xl font-bold">
        🤖 AI Recruit
      </h1>

      <p className="text-gray-400 mt-2">
        {profile.company}
      </p>

      <div className="bg-white/10 rounded-xl p-4 mt-8 mb-8 text-center">

        <img
          src={
            profile.profile_image ||
            "https://i.pravatar.cc/150"
          }
          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover border-2 border-blue-500"
        />

        <h3 className="font-bold text-lg">
          {profile.recruiter}
        </h3>

        <p className="text-gray-400">
          {profile.designation}
        </p>

      </div>

      <div className="space-y-2">

        {menu.map((item) => (

          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`
            }
          >
            {item.icon}
            <span>{item.title}</span>
          </NavLink>

        ))}

      </div>

      <button
        onClick={handleLogout}
        className="absolute bottom-8 left-6 right-6 bg-red-600 hover:bg-red-700 rounded-xl p-3"
      >
        <FaSignOutAlt className="inline mr-2" />
        Logout
      </button>

    </div>

  );

}

export default Sidebar;