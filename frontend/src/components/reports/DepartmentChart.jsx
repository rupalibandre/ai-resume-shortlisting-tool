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

    {
      name: "Selected",
      value: report.selected || 0,
    },

  ];

  const COLORS = [

    "#22C55E",
    "#EF4444",
    "#F59E0B",
    "#3B82F6",

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

          Candidate Status

        </h2>

        <p className="text-gray-400 text-sm mt-1">

          Distribution of candidate pipeline

        </p>

      </div>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <PieChart>

          <Pie

            data={data}

            dataKey="value"

            nameKey="name"

            innerRadius={70}

            outerRadius={120}

            paddingAngle={4}

          >

            {

              data.map((entry,index)=>(

                <Cell

                  key={index}

                  fill={COLORS[index]}

                />

              ))

            }

          </Pie>

          <Tooltip

            contentStyle={{

              background:"#0F172A",

              border:"1px solid #334155",

              borderRadius:"12px",

              color:"#fff",

            }}

          />

          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default DepartmentChart;