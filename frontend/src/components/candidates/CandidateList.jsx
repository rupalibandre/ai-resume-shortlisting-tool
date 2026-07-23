import { useState } from "react";
import CandidateSearch from "./CandidateSearch";
import CandidateCard from "./CandidateCard";
import CandidateStats from "./CandidateStats";
import CandidateDetailsModal from "./CandidateDetailsModal";

const candidates = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "React Developer",
    experience: "2 Years",
    score: 92,
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya Patil",
    role: "Python Developer",
    experience: "3 Years",
    score: 85,
    status: "Pending",
  },
  {
    id: 3,
    name: "Aman Kumar",
    role: "UI/UX Designer",
    experience: "1 Year",
    score: 68,
    status: "Rejected",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Java Developer",
    experience: "4 Years",
    score: 95,
    status: "Shortlisted",
  },
];

function CandidateList() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter((candidate) => {
    const matchSearch =
      candidate.name.toLowerCase().includes(search.toLowerCase()) ||
      candidate.role.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      status === "All" || candidate.status === status;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-8">

      <CandidateStats />

      <div>

        <h1 className="text-4xl font-bold">
          Candidates
        </h1>

        <p className="text-gray-400 mt-2">
          AI Candidate Management
        </p>

      </div>

      <CandidateSearch
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="grid lg:grid-cols-2 gap-6">

        {filteredCandidates.map((candidate) => (
          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onView={setSelectedCandidate}
          />
        ))}

      </div>

      <CandidateDetailsModal
        isOpen={selectedCandidate !== null}
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />

    </div>
  );
}

export default CandidateList;