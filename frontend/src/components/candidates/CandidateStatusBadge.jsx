function CandidateStatusBadge({ status }) {

  const colors = {
    Pending: "bg-yellow-500",
    Shortlisted: "bg-blue-600",
    "Interview Scheduled": "bg-purple-600",
    Selected: "bg-green-600",
    Rejected: "bg-red-600",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
        colors[status] || "bg-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

export default CandidateStatusBadge;