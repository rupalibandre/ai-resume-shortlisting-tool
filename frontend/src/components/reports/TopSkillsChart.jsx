import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
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

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Most Required Skills
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <XAxis dataKey="skill" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default TopSkillsChart;