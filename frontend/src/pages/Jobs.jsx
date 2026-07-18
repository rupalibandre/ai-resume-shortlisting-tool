import { useEffect, useState } from "react";
import JobTable from "../components/jobs/JobTable";
import AddJobModal from "../components/jobs/AddJobModal";
import EditJobModal from "../components/jobs/EditJobModal";
import { initialJobs } from "../data/jobsData";

function Jobs() {
  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobs");
    return savedJobs ? JSON.parse(savedJobs) : initialJobs;
  });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  function addJob(job) {
    setJobs((prev) => [job, ...prev]);
  }

  function deleteJob(id) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  function editJob(job) {
    setSelectedJob(job);
    setOpenEditModal(true);
  }

  function updateJob(updatedJob) {
    setJobs((prev) =>
      prev.map((job) =>
        job.id === updatedJob.id ? updatedJob : job
      )
    );

    setOpenEditModal(false);
    setSelectedJob(null);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Jobs Management
        </h1>

        <button
          onClick={() => setOpenAddModal(true)}
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
        onDelete={deleteJob}
        onEdit={editJob}
      />

      <AddJobModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={addJob}
      />

      <EditJobModal
        isOpen={openEditModal}
        onClose={() => setOpenEditModal(false)}
        selectedJob={selectedJob}
        onUpdate={updateJob}
      />
    </div>
  );
}

export default Jobs;