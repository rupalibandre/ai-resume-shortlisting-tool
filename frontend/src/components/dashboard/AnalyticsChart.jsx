import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function AnalyticsChart({ average, chartData = [] }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-2">
        AI Recruitment Analytics
      </h2>

      <p className="text-gray-400 mb-6">
        Average Resume Match :
        <span className="text-green-400 font-bold ml-2">
          {average}%
        </span>
      </p>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <AreaChart data={chartData}>

          <defs>

            <linearGradient
              id="colorMatch"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="5%"
                stopColor="#2563eb"
                stopOpacity={0.9}
              />

              <stop
                offset="95%"
                stopColor="#2563eb"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            dataKey="label"
          />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            fill="url(#colorMatch)"
            strokeWidth={3}
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>

  );

}

export default AnalyticsChart;