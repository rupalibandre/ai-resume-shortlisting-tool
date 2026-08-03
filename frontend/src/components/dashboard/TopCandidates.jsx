function TopCandidates({ candidates }) {

  if (!candidates) return null;

  return (

    <div className="bg-white/5 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Top Candidates

      </h2>

      <div className="space-y-5">

        {candidates.map((candidate) => (

          <div

            key={candidate.id}

            className="flex justify-between items-center bg-white/5 rounded-xl p-4"

          >

            <div>

              <h3 className="font-semibold">

                {candidate.name}

              </h3>

              <p className="text-sm text-gray-400">

                {candidate.job}

              </p>

            </div>

            <div className="text-right">

              <h3 className="font-bold text-green-400">

                {candidate.score}%

              </h3>

              <p className="text-xs text-gray-400">

                {candidate.status}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default TopCandidates;