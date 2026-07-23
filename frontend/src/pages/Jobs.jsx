import { useEffect, useState } from "react";

import JobTable from "../components/jobs/JobTable";
import AddJobModal from "../components/jobs/AddJobModal";
import EditJobModal from "../components/jobs/EditJobModal";

import {
  getJobs,
  createJob,
  updateJob,
  deleteJob,
} from "../services/jobService";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");

  const [openAddModal, setOpenAddModal] =
    useState(false);

  const [openEditModal, setOpenEditModal] =
    useState(false);

  const [selectedJob, setSelectedJob] =
    useState(null);

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const data = await getJobs();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function addJob(jobData) {
    try {
      await createJob(jobData);

      await loadJobs();

      setOpenAddModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteJobHandler(id) {
    if (!window.confirm("Delete this job?")) return;

    try {
      await deleteJob(id);

      await loadJobs();
    } catch (error) {
      console.error(error);
    }
  }

  function editJob(job) {
    setSelectedJob(job);
    setOpenEditModal(true);
  }

  async function updateJobHandler(updatedJob) {
    try {
      await updateJob(
        selectedJob.id,
        updatedJob
      );

      await loadJobs();

      setOpenEditModal(false);

      setSelectedJob(null);
    } catch (error) {
      console.error(error);
    }
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

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search Jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
        />
      </div>

      <JobTable
        jobs={jobs}
        search={search}
        onDelete={deleteJobHandler}
        onEdit={editJob}
      />

      <AddJobModal
        isOpen={openAddModal}
        onClose={() => setOpenAddModal(false)}
        onSave={addJob}
      />

      <EditJobModal
        isOpen={openEditModal}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedJob(null);
        }}
        selectedJob={selectedJob}
        onUpdate={updateJobHandler}
      />
    </div>
  );
}

export default Jobs;