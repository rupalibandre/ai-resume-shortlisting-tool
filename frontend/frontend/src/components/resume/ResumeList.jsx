function ResumeList({ result }) {

  if (!result) {
    return null;
  }

  return (

    <div className="bg-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Match Result
      </h2>

      <div className="space-y-3">

        <p>
          <strong>Name :</strong> {result.candidate.name}
        </p>

        <p>
          <strong>Job :</strong> {result.candidate.job_title}
        </p>

        <p>
          <strong>Company :</strong> {result.candidate.company}
        </p>

        <p>
          <strong>Match :</strong> {result.candidate.match_percentage}%
        </p>

        <p>
          <strong>Status :</strong> {result.candidate.status}
        </p>

      </div>

      <div className="mt-6">

        <h3 className="font-bold text-xl mb-2">
          AI Analysis
        </h3>

        <div className="bg-slate-900 rounded-xl p-4 whitespace-pre-wrap">
          {typeof result.ai_result === "string"
            ? result.ai_result
            : JSON.stringify(result.ai_result, null, 2)}
        </div>

      </div>

    </div>

  );
}

export default ResumeList;