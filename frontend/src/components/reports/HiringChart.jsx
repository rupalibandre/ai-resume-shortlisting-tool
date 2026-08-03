import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
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

  const colors = [

    "#3B82F6",
    "#06B6D4",
    "#10B981",
    "#EF4444",
    "#F59E0B",

  ];

  return (

    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
      shadow-xl
      "
    >

      <div className="mb-6">

        <h2 className="text-2xl font-bold">

          Recruitment Summary

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Overall hiring statistics

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart
          data={data}
        >

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: "#CBD5E1",
            }}
          />

          <YAxis
            tick={{
              fill: "#CBD5E1",
            }}
          />

          <Tooltip
            cursor={{
              fill: "#1E293B",
            }}
            contentStyle={{
              background: "#0F172A",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="value"
            radius={[12,12,0,0]}
          >

            {

              data.map((entry,index)=>(

                <Cell
                  key={index}
                  fill={colors[index]}
                />

              ))

            }

          </Bar>

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default HiringChart;