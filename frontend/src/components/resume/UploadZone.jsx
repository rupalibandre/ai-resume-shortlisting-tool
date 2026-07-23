import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import api from "../../services/api";

function UploadZone({ setResult }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  async function loadJobs() {
    try {
      const response = await api.get("/jobs/");
      setJobs(response.data.jobs);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUpload() {
    if (!selectedJob) {
      alert("Please select a job.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();

    formData.append("job_id", selectedJob);
    formData.append("file", selectedFile);

    try {
      setLoading(true);

      const response = await api.post(
        "/resume/match",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);

      alert("Resume Matched Successfully ✅");

    } catch (error) {
      console.error(error);
      alert("Matching Failed ❌");
    } finally {
      setLoading(false);
    }
  }
    return (
    <div className="border-2 border-dashed border-blue-500 rounded-3xl p-16 bg-white/5 text-center hover:bg-white/10 transition">

      <FaCloudUploadAlt
        className="mx-auto text-blue-400"
        size={80}
      />

      <h2 className="text-3xl font-bold mt-6">
        Upload Resume for AI Matching
      </h2>

      <p className="text-gray-400 mt-3">
        Select a Job and Upload Resume
      </p>

      <div className="mt-8 max-w-md mx-auto">

        <select
          value={selectedJob}
          onChange={(e) => setSelectedJob(e.target.value)}
          className="w-full p-3 rounded-xl bg-slate-800 mb-5"
        >
          <option value="">Select Job</option>

          {jobs.map((job) => (
            <option
              key={job.id}
              value={job.id}
            >
              {job.title}
            </option>
          ))}

        </select>

        {selectedFile && (
          <p className="text-green-400 mb-4">
            Selected: {selectedFile.name}
          </p>
        )}

        <label
          htmlFor="resume-upload"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl cursor-pointer"
        >
          Browse Resume
        </label>

        <input
          id="resume-upload"
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={(e) =>
            setSelectedFile(e.target.files[0])
          }
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className="block w-full mt-6 bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl"
        >
          {loading
            ? "Matching Resume..."
            : "Match Resume"}
        </button>

      </div>

    </div>
  );
}

export default UploadZone;