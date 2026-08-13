import api from "./api";

// ======================================================
// MATCH RESUME WITH JOB
// Backend: POST /resume/match
// ======================================================

export const matchResume = async (jobId, file) => {
  const formData = new FormData();

  formData.append("job_id", jobId);
  formData.append("file", file);

  const response = await api.post(
    "/resume/match",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


// ======================================================
// GET RESUME HISTORY
// Backend: GET /resume/history
// ======================================================

export const getResumeHistory = async () => {
  const response = await api.get("/resume/history");

  return response.data;
};


// ======================================================
// GET CANDIDATE DETAILS
// Backend: GET /resume/{candidate_id}
// ======================================================

export const getResumeDetails = async (candidateId) => {
  const response = await api.get(
    `/resume/${candidateId}`
  );

  return response.data;
};


// ======================================================
// DELETE RESUME
// Backend: DELETE /resume/{candidate_id}
// ======================================================

export const deleteResume = async (candidateId) => {
  const response = await api.delete(
    `/resume/${candidateId}`
  );

  return response.data;
};


// ======================================================
// REANALYZE RESUME
// Backend: POST /resume/reanalyze/{candidate_id}
// ======================================================

export const reanalyzeResume = async (candidateId) => {
  const response = await api.post(
    `/resume/reanalyze/${candidateId}`
  );

  return response.data;
};