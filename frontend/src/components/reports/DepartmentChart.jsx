import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function DepartmentChart({ report }) {

  const data = [
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

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#f59e0b",
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Candidate Status Distribution
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default DepartmentChart;