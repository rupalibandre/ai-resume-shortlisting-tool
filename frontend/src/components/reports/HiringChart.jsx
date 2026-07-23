import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", hired: 12 },
  { month: "Feb", hired: 18 },
  { month: "Mar", hired: 15 },
  { month: "Apr", hired: 24 },
  { month: "May", hired: 28 },
  { month: "Jun", hired: 34 },
];

function HiringChart() {
  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Monthly Hiring
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <AreaChart data={data}>

          <XAxis dataKey="month" />

          <Tooltip />

          <Area
            dataKey="hired"
            stroke="#3b82f6"
            fill="#2563eb"
          />

        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}

export default HiringChart;