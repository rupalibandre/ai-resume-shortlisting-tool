function RecentCandidates({ candidates = [] }) {

  function getStatusColor(status) {

    if (status === "Shortlisted")
      return "bg-green-600";

    if (status === "Rejected")
      return "bg-red-600";

    return "bg-yellow-500";
  }

  return (
    <div className="mt-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Recent Candidates
      </h2>

      <table className="w-full">

        <thead>

          <tr className="text-left border-b border-white/10">

            <th className="pb-4">Name</th>

            <th className="pb-4">Job</th>

            <th className="pb-4">Match</th>

            <th className="pb-4">Status</th>

          </tr>

        </thead>

        <tbody>

          {candidates.length === 0 ? (

            <tr>

              <td
                colSpan="4"
                className="py-8 text-center text-gray-400"
              >
                No Candidates Found
              </td>

            </tr>

          ) : (

            candidates.map((candidate) => (

              <tr
                key={candidate.id}
                className="border-b border-white/5"
              >

                <td className="py-4">
                  {candidate.name}
                </td>

                <td>
                  {candidate.job_title}
                </td>

                <td>
                  {candidate.match_percentage}%
                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      candidate.status
                    )}`}
                  >
                    {candidate.status}
                  </span>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default RecentCandidates;