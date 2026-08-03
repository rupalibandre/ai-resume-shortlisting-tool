import CandidateStatusBadge from "./CandidateStatusBadge";
import {
  FaEye,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

function CandidateTable({

  candidates,

  onView,

  onDelete,

}) {

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="text-left border-b border-white/10">

            <th className="py-4">Candidate</th>

            <th>Email</th>

            <th>Job</th>

            <th>AI Match</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {candidates.map((candidate) => (

            <tr
              key={candidate.id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >

              <td className="py-5 font-semibold">

                {candidate.name}

              </td>

              <td>

                {candidate.email}

              </td>

              <td>

                {candidate.job_title}

              </td>

              <td>

                <div className="flex items-center gap-3">

                  <div className="w-28 bg-white/10 rounded-full h-3">

                    <div

                      className="bg-green-500 h-3 rounded-full"

                      style={{
                        width: `${candidate.match_percentage}%`,
                      }}

                    />

                  </div>

                  <span>

                    {candidate.match_percentage}%

                  </span>

                </div>

              </td>

              <td>

                <CandidateStatusBadge
                  status={candidate.status}
                />

              </td>

              <td>

                <div className="flex gap-4">

                  <button
                    onClick={() => onView(candidate.id)}
                    className="text-blue-400 hover:text-blue-500"
                  >

                    <FaEye />

                  </button>

                  <a
                    href={`http://127.0.0.1:8000/uploads/${candidate.filename}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-400 hover:text-green-500"
                  >

                    <FaDownload />

                  </a>

                  <button
                    onClick={() => onDelete(candidate.id)}
                    className="text-red-500 hover:text-red-600"
                  >

                    <FaTrash />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default CandidateTable;