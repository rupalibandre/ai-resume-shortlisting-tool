import { Link } from "react-router-dom";

function badgeColor(status) {

  switch (status) {

    case "Selected":
      return "bg-green-600";

    case "Shortlisted":
      return "bg-blue-600";

    case "Interview":
      return "bg-yellow-500";

    case "Rejected":
      return "bg-red-600";

    default:
      return "bg-gray-600";

  }

}

function scoreColor(score) {

  if (score >= 80) return "text-green-400";

  if (score >= 60) return "text-yellow-400";

  return "text-red-400";

}

function RecentCandidates({ candidates = [] }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Recent Candidates
        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="text-left border-b border-white/10">

              <th className="py-3">Candidate</th>

              <th>Job</th>

              <th>Company</th>

              <th>AI Score</th>

              <th>Status</th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {candidates.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="text-center py-10 text-gray-400"
                >

                  No Candidates Found

                </td>

              </tr>

            ) : (

              candidates.map((candidate) => (

                <tr
                  key={candidate.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >

                  <td className="py-4">

                    {candidate.name}

                  </td>

                  <td>

                    {candidate.job}

                  </td>

                  <td>

                    {candidate.company}

                  </td>

                  <td
                    className={`font-bold ${scoreColor(candidate.score)}`}
                  >

                    {candidate.score}%

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${badgeColor(
                        candidate.status
                      )}`}
                    >

                      {candidate.status}

                    </span>

                  </td>

                  <td>

                    <Link
                      to={`/candidate/${candidate.id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm"
                    >

                      View

                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default RecentCandidates;