import { useEffect, useState } from "react";
import api from "../services/api";

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
  const [stats, setStats] = useState({
    total_jobs: 0,
    total_candidates: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0,
    average_match: 0,
    recent_candidates: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const response = await api.get("/dashboard/");
      setStats(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const cards = [
    {
      title: "Total Jobs",
      value: stats.total_jobs,
      icon: <FaBriefcase />,
      color: "text-blue-400",
    },
    {
      title: "Candidates",
      value: stats.total_candidates,
      icon: <FaUsers />,
      color: "text-green-400",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: <FaCheckCircle />,
      color: "text-purple-400",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle />,
      color: "text-red-400",
    },
  ];

  return (
    <div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((item) => (
          <StatCard
            key={item.title}
            title={item.title}
            value={item.value}
            icon={item.icon}
            color={item.color}
          />
        ))}

      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

        <div className="xl:col-span-2">
          <AnalyticsChart
            average={stats.average_match}
          />
        </div>

        <TopSkills />

      </div>

      <RecentCandidates
        candidates={stats.recent_candidates}
      />

    </div>
  );
}

export default Dashboard;