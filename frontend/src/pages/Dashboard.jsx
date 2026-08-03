import { useEffect, useState } from "react";
import api from "../services/api";

import StatCard from "../components/dashboard/StatCard";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import RecentActivity from "../components/dashboard/RecentActivity";
import UpcomingInterviews from "../components/dashboard/UpcomingInterviews";
import AIInsights from "../components/dashboard/AIInsights";
import Pipeline from "../components/dashboard/Pipeline";
import QuickActions from "../components/dashboard/QuickActions";

import JobAnalytics from "../components/dashboard/JobAnalytics";
import MonthlyHiringChart from "../components/dashboard/MonthlyHiringChart";
import TopCandidates from "../components/dashboard/TopCandidates";

function Dashboard() {

  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {

    loadDashboard();

  }, []);

  async function loadDashboard() {

    try {

      const res = await api.get("/dashboard/");

      setDashboard(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  }

  async function refreshDashboard() {

    setRefreshing(true);

    await loadDashboard();

  }

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <div className="text-2xl font-semibold">

          Loading Dashboard...

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">

            AI Recruitment Dashboard

          </h1>

          <p className="text-gray-400 mt-2">

            Monitor hiring activities in real time.

          </p>

        </div>

        <button

          onClick={refreshDashboard}

          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"

        >

          {refreshing ? "Refreshing..." : "Refresh Dashboard"}

        </button>

      </div>

      {/* Statistics */}

      <div className="grid xl:grid-cols-4 lg:grid-cols-2 gap-6">

        <StatCard

          title="Total Jobs"

          value={dashboard.statistics.total_jobs}

          color="blue"

        />

        <StatCard

          title="Candidates"

          value={dashboard.statistics.total_candidates}

          color="purple"

        />

        <StatCard

          title="Shortlisted"

          value={dashboard.statistics.shortlisted}

          color="green"

        />

        <StatCard

          title="Interview"

          value={dashboard.statistics.interview}

          color="yellow"

        />

        <StatCard

          title="Selected"

          value={dashboard.statistics.selected}

          color="emerald"

        />

        <StatCard

          title="Rejected"

          value={dashboard.statistics.rejected}

          color="red"

        />

        <StatCard

          title="Average Match"

          value={`${dashboard.statistics.average_match}%`}

          color="pink"

        />

        <StatCard

          title="Highest Match"

          value={`${dashboard.statistics.highest_match}%`}

          color="indigo"

        />

      </div>
            {/* Charts */}

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">

          <AnalyticsChart

            data={dashboard.chart}

          />

        </div>

        <AIInsights

          insights={dashboard.ai_insights}

        />

      </div>

      {/* Monthly Hiring + Pipeline */}

      <div className="grid xl:grid-cols-2 gap-6">

        <MonthlyHiringChart

          data={dashboard.monthly_hiring}

        />

        <Pipeline

          data={dashboard.status_chart}

        />

      </div>

      {/* Job Analytics */}

      <JobAnalytics

        analytics={dashboard.job_analytics}

      />

      {/* Activities */}

      <div className="grid xl:grid-cols-3 gap-6">

        <RecentActivity

          activities={dashboard.activities}

        />

        <UpcomingInterviews

          interviews={dashboard.upcoming_interviews}

        />

        <TopCandidates

          candidates={dashboard.top_candidates}

        />

      </div>

      {/* Recent Candidates */}

      <div className="bg-white/5 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">

          Recent Candidates

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="text-left border-b border-white/10">

                <th className="pb-4">Candidate</th>

                <th>Job</th>

                <th>Company</th>

                <th>Match</th>

                <th>Status</th>

                <th>Resume</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recent_candidates.map(

                (candidate) => (

                  <tr

                    key={candidate.id}

                    className="border-b border-white/5 hover:bg-white/5"

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

                    <td>

                      <span className="font-semibold text-green-400">

                        {candidate.score}%

                      </span>

                    </td>

                    <td>

                      {candidate.status}

                    </td>

                    <td>

                      <a

                        href={`http://127.0.0.1:8000/uploads/${candidate.resume}`}

                        target="_blank"

                        rel="noreferrer"

                        className="text-blue-400 hover:underline"

                      >

                        View Resume

                      </a>

                    </td>

                  </tr>

                )

              )}

            </tbody>

          </table>

        </div>

      </div>
            {/* Quick Actions */}

      <QuickActions />

    </div>

  );

}

export default Dashboard;  