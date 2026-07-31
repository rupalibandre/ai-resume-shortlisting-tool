import { useState } from "react";

function ResumeViewer({ filename }) {

  const [open, setOpen] = useState(false);

  if (!filename) {
    return (
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">
          Resume
        </h2>

        <p className="text-gray-400">
          Resume Not Available
        </p>
      </div>
    );
  }

  const resumeUrl = `http://127.0.0.1:8000/viewer/${encodeURIComponent(filename)}`;

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <div className="flex justify-between items-center mb-5">

        <h2 className="text-2xl font-bold">
          Resume
        </h2>

        <div className="flex gap-3">

          <button
            onClick={() => setOpen(!open)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg"
          >
            {open ? "Hide Resume" : "View Resume"}
          </button>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
          >
            Open
          </a>

        </div>

      </div>

      {open && (

        <iframe
          title="Resume Viewer"
          src={resumeUrl}
          className="w-full h-[700px] rounded-xl bg-white"
        />

      )}

    </div>
  );
}

export default ResumeViewer;