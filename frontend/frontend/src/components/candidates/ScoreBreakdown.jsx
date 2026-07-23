function ScoreBreakdown() {
  const scores = [
    { title: "Skills Match", score: 94 },
    { title: "Experience", score: 88 },
    { title: "Education", score: 91 },
    { title: "Projects", score: 85 },
    { title: "Communication", score: 80 },
  ];

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Score Breakdown
      </h2>

      {scores.map((item) => (
        <div key={item.title} className="mb-5">

          <div className="flex justify-between mb-2">
            <span>{item.title}</span>
            <span>{item.score}%</span>
          </div>

          <div className="w-full bg-slate-700 h-3 rounded-full">

            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: `${item.score}%` }}
            />

          </div>

        </div>
      ))}

    </div>
  );
}

export default ScoreBreakdown;