import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
} from "recharts";

function AnalyticsChart({ average = 0 }) {
  const data = [
    {
      name: "Average Match",
      value: average,
      fill: "#3b82f6",
    },
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-[350px]">

      <h2 className="text-2xl font-semibold mb-6">
        AI Resume Matching Analytics
      </h2>

      <ResponsiveContainer width="100%" height="100%">

        <RadialBarChart
          cx="50%"
          cy="45%"
          innerRadius="60%"
          outerRadius="95%"
          barSize={20}
          data={data}
          startAngle={180}
          endAngle={0}
        >

          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />

          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
          />

          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="white"
            fontSize={34}
            fontWeight="bold"
          >
            {average}%
          </text>

          <text
            x="50%"
            y="60%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9CA3AF"
            fontSize={16}
          >
            Average Match
          </text>

        </RadialBarChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;
