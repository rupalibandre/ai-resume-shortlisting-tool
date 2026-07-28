import { useState } from "react";
import api from "../../services/api";

import ResumeViewer from "./ResumeViewer";
import CandidateNotes from "./CandidateNotes";
import SkillMatch from "./SkillMatch";
import ScoreBreakdown from "./ScoreBreakdown";
import CandidateTimeline from "./CandidateTimeline";
import AIRecommendation from "./AIRecommendation";

function CandidateDetailsModal({
  isOpen,
  onClose,
  candidate,
}) {

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [mode, setMode] = useState("Online");
  const [interviewer, setInterviewer] = useState("");

  if (!isOpen || !candidate) return null;

  async function scheduleInterview() {

    try {

      await api.put(
        `/interview/${candidate.id}`,
        {
          interview_date: date,
          interview_time: time,
          interview_mode: mode,
          interviewer_name: interviewer,
        }
      );

      alert("Interview Scheduled Successfully");

    } catch (err) {

      console.log(err);

      alert("Unable to Schedule Interview");

    }

  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-6">

      <div className="bg-slate-900 w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-2xl border border-white/10 p-8">

        <div className="flex justify-between items-center">

          <h1 className="text-3xl font-bold">
            Candidate Profile
          </h1>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="grid xl:grid-cols-2 gap-8 mt-8">

          <div className="space-y-8">

            <ResumeViewer
              filename={candidate.filename}
            />

            <CandidateNotes />

          </div>

          <div className="space-y-8">

            <AIRecommendation
              score={candidate.match_percentage}
            />

            <SkillMatch />

            <ScoreBreakdown />

            <CandidateTimeline />

            <div className="bg-white/10 rounded-2xl p-6">

              <h2 className="text-2xl font-bold mb-5">
                Schedule Interview
              </h2>

              <input
                type="date"
                className="w-full p-3 rounded-xl bg-slate-800 mb-4"
                value={date}
                onChange={(e)=>setDate(e.target.value)}
              />

              <input
                type="time"
                className="w-full p-3 rounded-xl bg-slate-800 mb-4"
                value={time}
                onChange={(e)=>setTime(e.target.value)}
              />

              <select
                className="w-full p-3 rounded-xl bg-slate-800 mb-4"
                value={mode}
                onChange={(e)=>setMode(e.target.value)}
              >

                <option>Online</option>

                <option>Offline</option>

              </select>

              <input
                type="text"
                placeholder="Interviewer Name"
                className="w-full p-3 rounded-xl bg-slate-800 mb-5"
                value={interviewer}
                onChange={(e)=>setInterviewer(e.target.value)}
              />

              <button
                onClick={scheduleInterview}
                className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl"
              >
                Schedule Interview
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}

export default CandidateDetailsModal;