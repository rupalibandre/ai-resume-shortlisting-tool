function CandidateTimeline() {
  const timeline = [
    "Resume Uploaded",
    "AI Analysis Completed",
    "HR Reviewed",
    "Interview Scheduled",
  ];

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Candidate Timeline
      </h2>

      {timeline.map((step, index) => (
        <div
          key={step}
          className="flex items-center gap-4 mb-5"
        >
          <div className="w-4 h-4 rounded-full bg-blue-500" />

          <p>
            {index + 1}. {step}
          </p>

        </div>
      ))}

    </div>
  );
}

export default CandidateTimeline;