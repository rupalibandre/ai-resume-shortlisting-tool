function JobAnalytics({ analytics }) {
  if (!analytics) return null;

  const cards = [
    {
      title: "Active Jobs",
      value: analytics.active_jobs,
      color: "bg-green-500",
    },
    {
      title: "Closed Jobs",
      value: analytics.closed_jobs,
      color: "bg-red-500",
    },
    {
      title: "High Priority",
      value: analytics.high_priority_jobs,
      color: "bg-yellow-500",
    },
    {
      title: "Vacancies",
      value: analytics.vacancies,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-white/5 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Job Analytics

      </h2>

      <div className="grid grid-cols-2 gap-4">

        {cards.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 rounded-xl p-5"
          >

            <div
              className={`w-4 h-4 rounded-full ${item.color} mb-3`}
            />

            <p className="text-gray-400">

              {item.title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {item.value}

            </h2>

          </div>

        ))}

      </div>

    </div>
  );
}

export default JobAnalytics;