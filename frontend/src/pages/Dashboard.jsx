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
  FaClock,
  FaUserTie,
  FaStar,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {

  const [stats, setStats] = useState({
    total_jobs: 0,
    total_candidates: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0,
    interview: 0,
    selected: 0,
    average_match: 0,

    recent_candidates: [],
    top_candidates: [],

    chart: [],
    status_chart: [],
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {

    try {

      const response = await api.get("/dashboard/");

      setStats({
        ...response.data.statistics,
        recent_candidates: response.data.recent_candidates || [],
        top_candidates: response.data.top_candidates || [],
        chart: response.data.chart || [],
        status_chart: response.data.status_chart || [],
      });

    } catch (error) {

      console.log(error);

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

    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "text-yellow-400",
    },

    {
      title: "Interview",
      value: stats.interview,
      icon: <FaUserTie />,
      color: "text-cyan-400",
    },

    {
      title: "Selected",
      value: stats.selected,
      icon: <FaStar />,
      color: "text-emerald-400",
    },

    {
      title: "Average Match",
      value: `${stats.average_match}%`,
      icon: <FaChartLine />,
      color: "text-orange-400",
    },

  ];

  return (

    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {cards.map((card) => (

          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />

        ))}

      </div>

      <div className="grid xl:grid-cols-3 gap-8">

        <div className="xl:col-span-2">

          <AnalyticsChart
            average={stats.average_match}
            chartData={stats.chart}
          />

        </div>

        <TopSkills />

      </div>

      <RecentCandidates
        candidates={stats.recent_candidates}
      />

      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">

          ⭐ Top Candidates

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-white/10">

                <th className="pb-3">Candidate</th>

                <th>Job</th>

                <th>Company</th>

                <th>Score</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {stats.top_candidates.map((candidate) => (

                <tr
                  key={candidate.id}
                  className="border-b border-white/5"
                >

                  <td className="py-4">

                    {candidate.name}

                  </td>

                  <td>

                    {candidate.job}

                  </td>

                  <td>

                    {candidate.company}

                  </td>

                  <td className="text-green-400 font-bold">

                    {candidate.score}%

                  </td>

                  <td>

                    {candidate.status}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;