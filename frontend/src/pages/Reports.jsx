import { useEffect, useState } from "react";
import api from "../services/api";

import ReportStats from "../components/reports/ReportStats";
import HiringChart from "../components/reports/HiringChart";
import DepartmentChart from "../components/reports/DepartmentChart";
import TopSkillsChart from "../components/reports/TopSkillsChart";
import ExportButtons from "../components/reports/ExportButtons";

function Reports() {

  const [report, setReport] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadReports();

  }, []);

  async function loadReports() {

    try {

      const res = await api.get("/reports/");

      setReport(res.data);

    }

    catch (err) {

      console.log(err);

    }

    finally {

      setLoading(false);

    }

  }

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[80vh]">

        <div className="text-center">

          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="mt-5 text-xl">

            Loading Reports...

          </h2>

        </div>

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">

            Recruitment Reports

          </h1>

          <p className="text-gray-400 mt-2">

            AI Powered Recruitment Analytics Dashboard

          </p>

        </div>

        <ExportButtons />

      </div>

      {/* Top Statistics */}

      <ReportStats report={report.statistics} />

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        <HiringChart
          report={report.statistics}
        />

        <DepartmentChart
          report={report.statistics}
        />

      </div>

      {/* Skills */}

      <TopSkillsChart />

      {/* AI Insights */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-8">

          AI Insights

        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/5 rounded-xl p-6">

            <p className="text-gray-400">

              Highest Match

            </p>

            <h2 className="text-4xl font-bold text-green-400 mt-3">

              {report.ai_insights.highest_match}%

            </h2>

          </div>

          <div className="bg-white/5 rounded-xl p-6">

            <p className="text-gray-400">

              Lowest Match

            </p>

            <h2 className="text-4xl font-bold text-red-400 mt-3">

              {report.ai_insights.lowest_match}%

            </h2>

          </div>

          <div className="bg-white/5 rounded-xl p-6">

            <p className="text-gray-400">

              Avg Experience

            </p>

            <h2 className="text-4xl font-bold text-blue-400 mt-3">

              {report.ai_insights.average_experience} Years

            </h2>

          </div>

        </div>

        <div className="mt-8 p-6 rounded-xl bg-blue-500/10 border border-blue-500">

          <h3 className="font-bold text-xl">

            AI Recommendation

          </h3>

          <p className="text-gray-300 mt-3">

            {report.ai_insights.recommendation}

          </p>

        </div>

      </div>

      {/* Job Analytics */}

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

        <h2 className="text-2xl font-bold mb-8">

          Job Analytics

        </h2>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">

          <div className="bg-white/5 rounded-xl p-5">

            <p className="text-gray-400">

              Active Jobs

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {report.job_analytics.active_jobs}

            </h2>

          </div>

          <div className="bg-white/5 rounded-xl p-5">

            <p className="text-gray-400">

              Closed Jobs

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {report.job_analytics.closed_jobs}

            </h2>

          </div>

          <div className="bg-white/5 rounded-xl p-5">

            <p className="text-gray-400">

              High Priority

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {report.job_analytics.high_priority_jobs}

            </h2>

          </div>

          <div className="bg-white/5 rounded-xl p-5">

            <p className="text-gray-400">

              Vacancies

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {report.job_analytics.vacancies}

            </h2>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Reports;