function CandidateCard({
  candidate,
  onView,
}) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-blue-500 transition">

      <div className="flex justify-between">

        <div>

          <h2 className="text-2xl font-bold">
            {candidate.name}
          </h2>

          <p className="text-gray-400 mt-2">
            {candidate.role}
          </p>

          <p className="text-gray-500 mt-1">
            {candidate.experience}
          </p>

        </div>

        <div>

          <h2 className="text-3xl text-blue-400 font-bold">
            {candidate.score}%
          </h2>

          <p className="text-gray-400">
            AI Score
          </p>

        </div>

      </div>

      <div className="mt-6">

        <div className="w-full bg-slate-700 rounded-full h-3">

          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{
              width: `${candidate.score}%`,
            }}
          />

        </div>

      </div>

      <div className="flex justify-between items-center mt-6">

        <span
          className={`px-4 py-2 rounded-full ${
            candidate.status === "Shortlisted"
              ? "bg-green-600"
              : candidate.status === "Pending"
              ? "bg-yellow-600"
              : "bg-red-600"
          }`}
        >
          {candidate.status}
        </span>

        <button
          onClick={() => onView(candidate)}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
        >
          View Details
        </button>

      </div>

    </div>
  );
}

export default CandidateCard;