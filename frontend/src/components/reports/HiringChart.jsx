import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function HiringChart({ report }) {

  const data = [
    {
      name: "Jobs",
      value: report.total_jobs,
    },
    {
      name: "Candidates",
      value: report.total_candidates,
    },
    {
      name: "Shortlisted",
      value: report.shortlisted,
    },
    {
      name: "Rejected",
      value: report.rejected,
    },
    {
      name: "Pending",
      value: report.pending,
    },
  ];

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recruitment Summary
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default HiringChart;