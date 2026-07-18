import {
  FaHome,
  FaBriefcase,
  FaUsers,
  FaFileUpload,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menu = [
  { icon: <FaHome />, title: "Dashboard" },
  { icon: <FaBriefcase />, title: "Jobs" },
  { icon: <FaUsers />, title: "Candidates" },
  { icon: <FaFileUpload />, title: "Upload Resume" },
  { icon: <FaChartBar />, title: "Reports" },
  { icon: <FaCog />, title: "Settings" },
];

function Sidebar() {
  return (
    <div className="w-72 h-screen bg-white/10 backdrop-blur-xl border-r border-white/10 p-6 fixed">

      <h1 className="text-2xl font-bold text-white">
        🤖 AI Recruit
      </h1>

      <p className="text-gray-400 text-sm mt-2">
        HR Management System
      </p>

      <div className="mt-12 space-y-3">

        {menu.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-4 p-4 rounded-xl hover:bg-blue-600 cursor-pointer transition-all"
          >
            <span className="text-xl">{item.icon}</span>

            <span>{item.title}</span>
          </div>
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