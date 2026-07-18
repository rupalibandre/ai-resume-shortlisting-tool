function ResumeCard({ name, score, status }) {
  return (
    <div className="bg-white/10 rounded-2xl p-5 border border-white/10 flex justify-between items-center">

      <div>
        <h2 className="font-bold text-lg">
          {name}
        </h2>

        <p className="text-gray-400">
          AI Score : {score}%
        </p>
      </div>

      <span
        className={`px-4 py-2 rounded-full ${
          status === "Shortlisted"
            ? "bg-green-600"
            : status === "Pending"
            ? "bg-yellow-600"
            : "bg-red-600"
        }`}
      >
        {status}
      </span>

    </div>
  );
}

export default ResumeCard;