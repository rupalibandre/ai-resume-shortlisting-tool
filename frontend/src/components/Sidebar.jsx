import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaFileUpload,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    { title: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { title: "Jobs", icon: <FaBriefcase />, path: "/jobs" },
    { title: "Candidates", icon: <FaUsers />, path: "/candidates" },
    { title: "Upload Resume", icon: <FaFileUpload />, path: "/upload-resume" },
    { title: "Reports", icon: <FaChartBar />, path: "/reports" },
    { title: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div className="w-72 h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-6 fixed">

      <h1 className="text-3xl font-bold text-white">
        🤖 AI Recruit
      </h1>

      <p className="text-gray-400 mt-2">
        HR Management System
      </p>

      <div className="mt-10 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-4 rounded-xl transition-all ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-white/10"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.title}</span>
          </NavLink>
        ))}
      </div>

      <button className="absolute bottom-8 left-6 right-6 bg-red-600 hover:bg-red-700 p-3 rounded-xl">
        <FaSignOutAlt className="inline mr-2" />
        Logout
      </button>
    </div>
  );
}

export default Sidebar;