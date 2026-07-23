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
  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-5">

      <div className="bg-slate-900 w-full max-w-7xl max-h-[92vh] overflow-y-auto rounded-2xl border border-white/10 p-8">

        <div className="flex justify-between items-center mb-8">

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

        <div className="grid xl:grid-cols-2 gap-8">

          <div className="space-y-8">

            <ResumeViewer />

            <CandidateNotes />

          </div>

          <div className="space-y-8">

            <AIRecommendation score={candidate.score} />

            <SkillMatch />

            <ScoreBreakdown />

            <CandidateTimeline />

          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateDetailsModal;