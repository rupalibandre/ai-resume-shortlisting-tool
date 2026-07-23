import { recentCandidates } from "../../data/dashboardData";

function RecentCandidates() {
  const getStatusColor = (status) => {
    switch (status) {
      case "Shortlisted":
        return "bg-green-600";
      case "Interview":
        return "bg-yellow-600";
      default:
        return "bg-blue-600";
    }
  };

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Recent Candidates
      </h2>

      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-white/10">
            <th className="pb-4">Name</th>
            <th className="pb-4">Role</th>
            <th className="pb-4">AI Score</th>
            <th className="pb-4">Status</th>
            <th className="pb-4">Action</th>
          </tr>
        </thead>

        <tbody>
          {recentCandidates.map((candidate) => (
            <tr key={candidate.id} className="border-b border-white/5">
              <td className="py-4">{candidate.name}</td>
              <td>{candidate.role}</td>
              <td>{candidate.score}%</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    candidate.status
                  )}`}
                >
                  {candidate.status}
                </span>
              </td>
              <td>
                <button className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentCandidates;