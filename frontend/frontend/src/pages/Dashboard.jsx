import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import TopSkills from "../components/dashboard/TopSkills";
import RecentCandidates from "../components/dashboard/RecentCandidates";
import StatCard from "../components/StatCard";

import {
  FaBriefcase,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

function Dashboard() {
  const stats = [
    {
      title: "Total Jobs",
      value: 15,
      icon: <FaBriefcase />,
      color: "text-blue-400",
    },
    {
      title: "Candidates",
      value: 182,
      icon: <FaUsers />,
      color: "text-green-400",
    },
    {
      title: "Shortlisted",
      value: 49,
      icon: <FaCheckCircle />,
      color: "text-purple-400",
    },
    {
      title: "Rejected",
      value: 31,
      icon: <FaTimesCircle />,
      color: "text-red-400",
    },
  ];

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
        <div className="xl:col-span-2">
          <AnalyticsChart />
        </div>

        <TopSkills />
      </div>

      {/* Recent Candidates */}
      <RecentCandidates />
    </div>
  );
}

export default Dashboard;