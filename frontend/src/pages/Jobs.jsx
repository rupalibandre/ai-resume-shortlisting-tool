import { useState } from "react";
import JobTable from "../components/jobs/JobTable";
import AddJobModal from "../components/jobs/AddJobModal";
import { initialJobs } from "../data/jobsData";

function Jobs() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [openModal, setOpenModal] = useState(false);

  function addJob(newJob) {
    setJobs((prev) => [newJob, ...prev]);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Jobs Management
        </h1>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
        >
          + Add Job
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="bg-white/10 border border-white/10 rounded-xl px-4 py-3"
        >
          <option>All</option>
          <option>Active</option>
          <option>Closed</option>
        </select>
      </div>

      <JobTable
        jobs={jobs}
        search={search}
        status={status}
      />

      <AddJobModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        onSave={addJob}
      />
    </div>
  );
}

export default Jobs;