function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">

      <div className="flex justify-between items-center">

        <div>
          <p className="text-gray-400 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div className={`text-5xl ${color}`}>
          {icon}
        </div>

      </div>

    </div>
  );
}

export default StatCard;