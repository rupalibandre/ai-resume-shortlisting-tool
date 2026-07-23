function AIRecommendation({ score }) {
  let recommendation = "Reject";
  let color = "text-red-400";

  if (score >= 90) {
    recommendation = "Highly Recommended";
    color = "text-green-400";
  } else if (score >= 75) {
    recommendation = "Recommended";
    color = "text-blue-400";
  } else if (score >= 60) {
    recommendation = "Needs Review";
    color = "text-yellow-400";
  }

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-4">
        AI Recommendation
      </h2>

      <h1 className={`text-3xl font-bold ${color}`}>
        {recommendation}
      </h1>

      <p className="text-gray-400 mt-4">
        AI evaluated this candidate based on skills,
        experience and resume matching score.
      </p>

    </div>
  );
}

export default AIRecommendation;