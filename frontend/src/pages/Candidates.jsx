import CandidateList from "../components/candidates/CandidateList";

function Candidates() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Candidates
        </h1>

        <p className="text-gray-400 mt-2">
          View all AI matched candidates.
        </p>
      </div>

      <CandidateList />

    </div>
  );
}

export default Candidates;