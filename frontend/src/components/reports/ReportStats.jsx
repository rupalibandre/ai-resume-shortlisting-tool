import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaBriefcase,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Candidates",
    value: 124,
    icon: <FaUsers />,
    color: "text-blue-400",
  },
  {
    title: "Shortlisted",
    value: 48,
    icon: <FaUserCheck />,
    color: "text-green-400",
  },
  {
    title: "Rejected",
    value: 37,
    icon: <FaUserTimes />,
    color: "text-red-400",
  },
  {
    title: "Open Jobs",
    value: 15,
    icon: <FaBriefcase />,
    color: "text-purple-400",
  },
];

function ReportStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className={`text-4xl ${item.color}`}>
            {item.icon}
          </div>

          <h3 className="text-gray-400 mt-4">
            {item.title}
          </h3>

          <h1 className="text-4xl font-bold mt-2">
            {item.value}
          </h1>
        </div>
      ))}
    </div>
  );
}

export default ReportStats;