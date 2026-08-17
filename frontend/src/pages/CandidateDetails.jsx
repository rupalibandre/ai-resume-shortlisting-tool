import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import InterviewModal from "../components/interview/InterviewModal";

function CandidateDetails() {

  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openInterview, setOpenInterview] = useState(false);

  useEffect(() => {
    loadCandidate();
  }, [id]);

  async function loadCandidate() {

    try {

      const response = await api.get(`/candidates/${id}`);

      setCandidate(response.data);

    } catch (error) {

      console.log(error);

      alert("Unable to load candidate details.");

    } finally {

      setLoading(false);

    }

  }

  async function updateStatus(status) {

    try {

      await api.put(`/interview/status/${id}/${status}`);

      alert(`Candidate ${status} Successfully`);

      loadCandidate();

    } catch (error) {

      console.log(error);

      alert("Unable to update status.");

    }

  }

  async function cancelInterview() {

    if (!window.confirm("Cancel Interview?")) return;

    try {

      await api.delete(`/interview/${id}`);

      alert("Interview Cancelled Successfully");

      loadCandidate();

    } catch (error) {

      console.log(error);

      alert("Unable to cancel interview.");

    }

  }

  function scheduleInterview() {

    setOpenInterview(true);

  }

  function viewResume() {

    if (!candidate?.filename) {

      alert("Resume not found.");

      return;

    }

    window.open(
      `https://backend-jpo6.onrender.com/viewer/${encodeURIComponent(candidate.filename)}`,
      "_blank"
    );

  }

  function downloadResume() {

    if (!candidate?.filename) {

      alert("Resume not found.");

      return;

    }

    window.open(
      `https://backend-jpo6.onrender.com/uploads/${encodeURIComponent(candidate.filename)}`,
      "_blank"
    );

  }

  if (loading) {

    return (

      <div className="text-center text-2xl mt-20">

        Loading Candidate...

      </div>

    );

  }

  if (!candidate) {

    return (

      <div className="text-center text-red-400 text-2xl mt-20">

        Candidate Not Found

      </div>

    );

  }

  return (

    <div className="space-y-8">

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

        <h1 className="text-4xl font-bold">
          {candidate.name}
        </h1>

        <p className="text-gray-400 mt-2">
          {candidate.job_title}
        </p>

        <div className="mt-6 grid md:grid-cols-4 gap-6">

          <div>

            <p className="text-gray-400">
              Company
            </p>

            <h2 className="text-xl">
              {candidate.company}
            </h2>

          </div>

          <div>

            <p className="text-gray-400">
              Match Score
            </p>

            <h2 className="text-green-400 text-3xl font-bold">
              {candidate.match_percentage}%
            </h2>

          </div>

          <div>

            <p className="text-gray-400">
              Status
            </p>

            <h2>
              {candidate.status}
            </h2>

          </div>

          <div>

            <p className="text-gray-400">
              Experience
            </p>

            <h2>
              {candidate.experience || "-"}
            </h2>

          </div>

        </div>

      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-8">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">
            Interview Details
          </h2>

          {candidate.interview_date ? (

            <span className="bg-green-600 px-4 py-2 rounded-xl">
              Scheduled
            </span>

          ) : (

            <span className="bg-yellow-600 px-4 py-2 rounded-xl">
              Not Scheduled
            </span>

          )}

        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <div>

            <p className="text-gray-400">
              Interview Date
            </p>

            <h3 className="text-xl mt-2">
              {candidate.interview_date || "-"}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Interview Time
            </p>

            <h3 className="text-xl mt-2">
              {candidate.interview_time || "-"}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Interviewer
            </p>

            <h3 className="text-xl mt-2">
              {candidate.interviewer_name || "-"}
            </h3>

          </div>

          <div>

            <p className="text-gray-400">
              Mode
            </p>

            <h3 className="text-xl mt-2">
              {candidate.interview_mode || "-"}
            </h3>

          </div>

        </div>

      </div>

      <div className="grid xl:grid-cols-2 gap-8">        <div className="bg-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            AI Summary
          </h2>

          <p className="whitespace-pre-wrap">
            {candidate.summary || "-"}
          </p>

        </div>

        <div className="bg-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Strengths
          </h2>

          <pre className="whitespace-pre-wrap">
{candidate.strengths || "-"}
          </pre>

        </div>

        <div className="bg-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Weaknesses
          </h2>

          <pre className="whitespace-pre-wrap">
{candidate.weaknesses || "-"}
          </pre>

        </div>

        <div className="bg-white/10 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-5">
            Missing Skills
          </h2>

          <pre className="whitespace-pre-wrap">
{candidate.missing_skills || "-"}
          </pre>

        </div>

      </div>

      <div className="bg-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          AI Interview Questions
        </h2>

        <pre className="whitespace-pre-wrap">
{candidate.interview_questions || "-"}
        </pre>

      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Candidate Actions
        </h2>

        <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-4">

          <button
            onClick={() => updateStatus("Shortlisted")}
            className="bg-green-600 hover:bg-green-700 rounded-xl py-3 font-semibold"
          >
            ✅ Shortlist
          </button>

          <button
            onClick={() => updateStatus("Rejected")}
            className="bg-red-600 hover:bg-red-700 rounded-xl py-3 font-semibold"
          >
            ❌ Reject
          </button>

          <button
            onClick={scheduleInterview}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-semibold"
          >
            {candidate.interview_date
              ? "📅 Reschedule"
              : "📅 Schedule"}
          </button>

          <button
            onClick={cancelInterview}
            className="bg-orange-600 hover:bg-orange-700 rounded-xl py-3 font-semibold"
          >
            🚫 Cancel
          </button>

          <button
            onClick={viewResume}
            className="bg-indigo-600 hover:bg-indigo-700 rounded-xl py-3 font-semibold"
          >
            👀 View Resume
          </button>

          <button
            onClick={downloadResume}
            className="bg-purple-600 hover:bg-purple-700 rounded-xl py-3 font-semibold"
          >
            📥 Download
          </button>

        </div>

      </div>

      <InterviewModal
        open={openInterview}
        onClose={() => setOpenInterview(false)}
        candidateId={candidate.id}
        onSuccess={loadCandidate}
      />

    </div>

  );

}

export default CandidateDetails;