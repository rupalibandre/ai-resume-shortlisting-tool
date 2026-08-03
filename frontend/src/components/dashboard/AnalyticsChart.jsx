import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function AnalyticsChart({ data }) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg h-[420px]">

      <h2 className="text-3xl font-bold text-white mb-2">
        AI Resume Match Analytics
      </h2>

      <p className="text-slate-400 mb-8">
        Candidate Match Percentage Distribution
      </p>

      <ResponsiveContainer width="100%" height="80%">

        <AreaChart data={data}>

          <defs>

            <linearGradient
              id="matchGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >

              <stop
                offset="0%"
                stopColor="#3b82f6"
                stopOpacity={0.9}
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity={0}
              />

            </linearGradient>

          </defs>

          <CartesianGrid
            stroke="#334155"
            strokeDasharray="4 4"
          />

          <XAxis
            dataKey="label"
            stroke="#94a3b8"
          />

          <YAxis
            stroke="#94a3b8"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #334155",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={4}
            fill="url(#matchGradient)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;