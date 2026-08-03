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

function TopSkillsChart() {

  const data = [

    { skill: "Python", count: 95 },
    { skill: "FastAPI", count: 88 },
    { skill: "React", count: 82 },
    { skill: "JavaScript", count: 76 },
    { skill: "SQL", count: 72 },
    { skill: "PostgreSQL", count: 65 },
    { skill: "Machine Learning", count: 60 },
    { skill: "Git", count: 58 },

  ];

  const colors = [

    "#3B82F6",
    "#06B6D4",
    "#8B5CF6",
    "#22C55E",
    "#F59E0B",
    "#EF4444",
    "#14B8A6",
    "#6366F1",

  ];

  return (

    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">

      <h2 className="text-2xl font-bold mb-6">

        Most Required Skills

      </h2>

      <ResponsiveContainer
        width="100%"
        height={340}
      >

        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
          />

          <XAxis
            dataKey="skill"
            tick={{ fill:"#CBD5E1" }}
          />

          <YAxis
            tick={{ fill:"#CBD5E1" }}
          />

          <Tooltip
            contentStyle={{
              background:"#0F172A",
              border:"1px solid #334155",
              borderRadius:"12px",
            }}
          />

          <Bar
            dataKey="count"
            radius={[8,8,0,0]}
          >

            {

              data.map((item,index)=>(

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

export default TopSkillsChart;