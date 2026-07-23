import ReportStats from "../components/reports/ReportStats";
import HiringChart from "../components/reports/HiringChart";
import DepartmentChart from "../components/reports/DepartmentChart";
import TopSkillsChart from "../components/reports/TopSkillsChart";
import ExportButtons from "../components/reports/ExportButtons";

function Reports() {
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

      <ReportStats />

      <HiringChart />

      <div className="grid xl:grid-cols-2 gap-8">

        <DepartmentChart />

        <TopSkillsChart />

      </div>

    </div>
  );
}

export default Reports;