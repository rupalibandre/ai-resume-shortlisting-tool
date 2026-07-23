import api from "./api";

// Get All Jobs
export const getJobs = async () => {
  const response = await api.get("/jobs/");
  return response.data;
};

// Create Job
export const createJob = async (jobData) => {
  const response = await api.post("/jobs/", jobData);
  return response.data;
};

// Update Job
export const updateJob = async (id, jobData) => {
  const response = await api.put(`/jobs/${id}`, jobData);
  return response.data;
};

// Delete Job
export const deleteJob = async (id) => {
  const response = await api.delete(`/jobs/${id}`);
  return response.data;
};