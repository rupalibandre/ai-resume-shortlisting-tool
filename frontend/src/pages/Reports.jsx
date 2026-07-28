import { useEffect, useState } from "react";
import api from "../services/api";

import ReportStats from "../components/reports/ReportStats";
import HiringChart from "../components/reports/HiringChart";
import DepartmentChart from "../components/reports/DepartmentChart";
import TopSkillsChart from "../components/reports/TopSkillsChart";
import ExportButtons from "../components/reports/ExportButtons";

function Reports() {

  const [report, setReport] = useState({
    total_jobs: 0,
    total_candidates: 0,
    shortlisted: 0,
    rejected: 0,
    pending: 0,
    average_match: 0,
  });

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    try {

      const response = await api.get("/reports/");

      setReport(response.data);

    } catch (error) {

      console.error(error);

    }
  }

  return (
    <div className="space-y-8">

      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">

        <div>

          <h1 className="text-4xl font-bold">
            Reports
          </h1>

          <p className="text-gray-400 mt-2">
            Recruitment Analytics Dashboard
          </p>

        </div>

        <ExportButtons />

      </div>

      <ReportStats report={report} />

      <HiringChart report={report} />

      <div className="grid xl:grid-cols-2 gap-8">

        <DepartmentChart report={report} />

        <TopSkillsChart report={report} />

      </div>

    </div>
  );
}

export default Reports;