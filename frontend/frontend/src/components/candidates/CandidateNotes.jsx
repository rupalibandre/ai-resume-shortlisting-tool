import { useState } from "react";

function CandidateNotes() {
  const [note, setNote] = useState("");

  return (
    <div className="bg-white/10 rounded-2xl border border-white/10 p-6 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Recruiter Notes
      </h2>

      <textarea
        rows="6"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write notes..."
        className="w-full bg-slate-900 rounded-xl p-4 outline-none resize-none"
      />

      <button className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl">
        Save Notes
      </button>

    </div>
  );
}

export default CandidateNotes;