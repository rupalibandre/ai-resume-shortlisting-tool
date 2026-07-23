import { FaEdit, FaTrash } from "react-icons/fa";

function JobTable({
  jobs,
  search,
  status,
  onDelete,
  onEdit,
}) {
  const filteredJobs = jobs.filter((job) => {
    const matchSearch = job.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchStatus =
      status === "All" || job.status === status;

    return matchSearch && matchStatus;
  });

  function handleDelete(id) {
    if (window.confirm("Delete this job?")) {
      onDelete(id);
    }
  }

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left pb-4">Job Title</th>
            <th className="text-left">Experience</th>
            <th className="text-left">Location</th>
            <th className="text-left">Status</th>
            <th className="text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredJobs.map((job) => (
            <tr
              key={job.id}
              className="border-b border-white/5"
            >
              <td className="py-5 font-semibold">
                {job.title}
              </td>

              <td>{job.experience}</td>

              <td>{job.location}</td>

              <td>
                <span
                  className={`px-3 py-1 rounded-full ${
                    job.status === "Active"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {job.status}
                </span>
              </td>

              <td>
                <div className="flex gap-4">
                  <button
                    onClick={() => onEdit(job)}
                  >
                    <FaEdit className="text-blue-400 hover:text-blue-300" />
                  </button>

                  <button
                    onClick={() => handleDelete(job.id)}
                  >
                    <FaTrash className="text-red-400 hover:text-red-300" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {filteredJobs.length === 0 && (
            <tr>
              <td
                colSpan="5"
                className="text-center py-8 text-gray-400"
              >
                No Jobs Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default JobTable;