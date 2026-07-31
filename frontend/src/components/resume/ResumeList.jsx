function ResumeList({ result }) {

  if (!result) {

    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 text-center">

        <h2 className="text-2xl font-bold mb-3">
          AI Match Result
        </h2>

        <p className="text-gray-400">
          Upload a resume to see AI matching results.
        </p>

      </div>
    );

  }

  const candidate = result;

  const convertToArray = (value) => {

    if (!value) return [];

    if (Array.isArray(value)) return value;

    return value
      .toString()
      .split("\n")
      .filter((item) => item.trim() !== "");

  };

  return (

    <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 p-8 mt-8">

      <h2 className="text-3xl font-bold mb-6">
        AI Resume Match Result
      </h2>

      <div className="space-y-3 mb-8">

        <p>
          <strong>Resume:</strong> {candidate.filename}
        </p>

        <p>
          <strong>Candidate:</strong> {candidate.name}
        </p>

        <p>
          <strong>Job:</strong> {candidate.job_title}
        </p>

        <p>
          <strong>Company:</strong> {candidate.company}
        </p>

        <p>
          <strong>Status:</strong> {candidate.status}
        </p>

      </div>

      <div className="bg-blue-600 rounded-2xl p-6 text-center mb-8">

        <h3 className="text-xl font-semibold">
          Match Percentage
        </h3>

        <p className="text-5xl font-bold mt-2">
          {candidate.match_percentage}%
        </p>

      </div>

      <div className="grid md:grid-cols-2 gap-8">

        <div>

          <h3 className="text-xl font-bold text-green-400 mb-3">
            Strengths
          </h3>

          <ul className="space-y-2">

            {convertToArray(candidate.strengths).map((item, index) => (

              <li key={index}>
                ✅ {item}
              </li>

            ))}

          </ul>

        </div>

        <div>

          <h3 className="text-xl font-bold text-red-400 mb-3">
            Missing Skills
          </h3>

          <ul className="space-y-2">

            {convertToArray(candidate.missing_skills).map((item, index) => (

              <li key={index}>
                ❌ {item}
              </li>

            ))}

          </ul>

        </div>

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold mb-3">
          Weaknesses
        </h3>

        <ul className="space-y-2">

          {convertToArray(candidate.weaknesses).map((item, index) => (

            <li key={index}>
              ⚠️ {item}
            </li>

          ))}

        </ul>

      </div>

      <div className="mt-8 bg-green-600 rounded-xl p-5">

        <h3 className="text-xl font-bold mb-2">
          AI Summary
        </h3>

        <p>
          {candidate.summary}
        </p>

      </div>

      <div className="mt-8">

        <h3 className="text-xl font-bold mb-3">
          Interview Questions
        </h3>

        <ul className="space-y-2">

          {convertToArray(candidate.interview_questions).map((item, index) => (

            <li key={index}>
              🎯 {item}
            </li>

          ))}

        </ul>

      </div>

    </div>

  );

}

export default ResumeList;