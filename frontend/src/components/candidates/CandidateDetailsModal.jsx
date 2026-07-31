import { useEffect, useState } from "react";
import api from "../../services/api";

import CandidateNotes from "./CandidateNotes";
import CandidateTimeline from "./CandidateTimeline";
import SkillMatch from "./SkillMatch";
import AIRecommendation from "./AIRecommendation";
import ResumeViewer from "./ResumeViewer";
import ScoreBreakdown from "./ScoreBreakdown";

function CandidateDetailsModal({
  isOpen,
  onClose,
  candidate,
}) {

  const [details, setDetails] = useState(null);

  useEffect(() => {

    if (isOpen && candidate?.id) {

      loadCandidate();

    }

  }, [isOpen, candidate]);

  async function loadCandidate() {

    try {

      const response = await api.get(
        `/candidates/${candidate.id}`
      );

      setDetails(response.data);

    } catch (err) {

      console.log(err);

    }

  }

  if (!isOpen || !candidate) return null;

  if (!details) {

    return (

      <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

        <div className="bg-slate-900 rounded-2xl p-10 text-xl">
          Loading Candidate...
        </div>

      </div>

    );

  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">

      <div className="bg-slate-900 w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 p-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            {details.name}
          </h1>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="grid xl:grid-cols-2 gap-8">

          <div className="space-y-8">

            <ResumeViewer filename={details.filename} />

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                AI Summary
              </h2>

              <p>
                {details.summary}
              </p>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Strengths
              </h2>

              <pre className="whitespace-pre-wrap">
{details.strengths}
              </pre>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Weaknesses
              </h2>

              <pre className="whitespace-pre-wrap">
{details.weaknesses}
              </pre>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                Missing Skills
              </h2>

              <pre className="whitespace-pre-wrap">
{details.missing_skills}
              </pre>

            </div>

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-4">
                AI Interview Questions
              </h2>

              <pre className="whitespace-pre-wrap">
{details.interview_questions}
              </pre>

            </div>

            <CandidateNotes />

          </div>

          <div className="space-y-8">

            <AIRecommendation
              score={details.match_percentage}
            />

            <SkillMatch />

            <ScoreBreakdown />

            <CandidateTimeline />

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-6">
                Interview Details
              </h2>

              <div className="space-y-3">

                <p>
                  <b>Status :</b> {details.status}
                </p>

                <p>
                  <b>Date :</b>{" "}
                  {details.interview_date || "-"}
                </p>

                <p>
                  <b>Time :</b>{" "}
                  {details.interview_time || "-"}
                </p>

                <p>
                  <b>Mode :</b>{" "}
                  {details.interview_mode || "-"}
                </p>

                <p>
                  <b>Interviewer :</b>{" "}
                  {details.interviewer_name || "-"}
                </p>

                <p>
                  <b>Round :</b>{" "}
                  {details.interview_round || "-"}
                </p>

                <p>
                  <b>Meeting Link :</b>{" "}
                  {details.meeting_link || "-"}
                </p>

                <p>
                  <b>Location :</b>{" "}
                  {details.location || "-"}
                </p>

                <p>
                  <b>Notes :</b>{" "}
                  {details.interview_notes || "-"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CandidateDetailsModal;