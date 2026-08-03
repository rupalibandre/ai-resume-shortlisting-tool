function AIInsights({ insights }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        AI Insights

      </h2>

      <div className="space-y-6">

        <div>

          <p className="text-gray-400">

            Average Match

          </p>

          <h3 className="text-3xl font-bold text-green-400">

            {insights.average_match}%

          </h3>

        </div>

        <div>

          <p className="text-gray-400">

            Top Skill

          </p>

          <h3 className="text-xl font-bold">

            {insights.top_skill}

          </h3>

        </div>

        <div>

          <p className="text-gray-400">

            Highest Match

          </p>

          <h3 className="text-xl font-bold">

            {insights.highest_match}%

          </h3>

        </div>

        <div className="bg-blue-600 rounded-xl p-4">

          <p className="text-sm">

            {insights.recommended_action}

          </p>

        </div>

      </div>

    </div>

  );

}

export default AIInsights;