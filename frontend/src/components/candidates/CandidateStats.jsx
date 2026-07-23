function CandidateStats() {
  const stats = [
    {
      title: "Total Candidates",
      value: 124,
      color: "bg-blue-600",
    },
    {
      title: "Shortlisted",
      value: 48,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: 39,
      color: "bg-yellow-600",
    },
    {
      title: "Rejected",
      value: 37,
      color: "bg-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div
            className={`w-4 h-4 rounded-full ${item.color}`}
          />

          <h3 className="text-gray-400 mt-4">
            {item.title}
          </h3>

          <h2 className="text-4xl font-bold mt-2">
            {item.value}
          </h2>
        </div>
      ))}
    </div>
  );
}

export default CandidateStats;