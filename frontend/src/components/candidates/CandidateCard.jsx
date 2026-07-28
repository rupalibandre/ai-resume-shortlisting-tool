import {
  FaEye,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

function CandidateCard({
  candidate,
  onView,
  onDelete,
  onStatusChange,
}) {
  function badgeColor(status) {
    if (status === "Shortlisted")
      return "bg-green-600";

    if (status === "Rejected")
      return "bg-red-600";

    return "bg-yellow-500";
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-blue-500 transition">

      <h2 className="text-2xl font-bold">
        {candidate.name}
      </h2>

      <p className="mt-3">
        📄 {candidate.filename}
      </p>

      <p>
        💼 {candidate.job_title}
      </p>

      <p>
        🏢 {candidate.company}
      </p>

      <div className="mt-5">

        <div className="flex justify-between mb-2">
          <span>Match</span>
          <span>{candidate.match_percentage}%</span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="bg-blue-500 h-3 rounded-full"
            style={{
              width: `${candidate.match_percentage}%`,
            }}
          />
        </div>

      </div>

      <div className="mt-5 flex justify-between items-center">

        <span
          className={`${badgeColor(
            candidate.status
          )} px-4 py-2 rounded-full`}
        >
          {candidate.status}
        </span>

      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">

        <button
          onClick={() => onStatusChange(candidate.id, "Shortlisted")}
          className="bg-green-600 hover:bg-green-700 p-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FaCheck />
          Shortlist
        </button>

        <button
          onClick={() => onStatusChange(candidate.id, "Rejected")}
          className="bg-red-600 hover:bg-red-700 p-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FaTimes />
          Reject
        </button>

        <button
          onClick={() => onView(candidate)}
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FaEye />
          Details
        </button>

        <button
          onClick={() => onDelete(candidate.id)}
          className="bg-gray-700 hover:bg-gray-800 p-3 rounded-xl flex justify-center items-center gap-2"
        >
          <FaTrash />
          Delete
        </button>

      </div>

    </div>
  );
}

export default CandidateCard;