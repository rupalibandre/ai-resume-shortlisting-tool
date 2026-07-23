import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { hiringData } from "../../data/dashboardData";

function AnalyticsChart() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-[350px]">

      <h2 className="text-2xl font-semibold mb-6">
        Hiring Analytics
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={hiringData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="hired"
            stroke="#3b82f6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default AnalyticsChart;
