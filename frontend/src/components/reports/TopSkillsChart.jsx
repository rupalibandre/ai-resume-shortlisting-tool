import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { skill: "React", count: 42 },
  { skill: "Python", count: 37 },
  { skill: "Java", count: 30 },
  { skill: "SQL", count: 26 },
  { skill: "Node", count: 22 },
];

function TopSkillsChart() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Top Skills
      </h2>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>

          <XAxis dataKey="skill" />
          <YAxis />
          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default TopSkillsChart;