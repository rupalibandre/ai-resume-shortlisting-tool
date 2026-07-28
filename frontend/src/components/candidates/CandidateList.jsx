import { useEffect, useState } from "react";
import api from "../../services/api";

import CandidateCard from "./CandidateCard";
import CandidateDetailsModal from "./CandidateDetailsModal";

function CandidateList() {
  const [candidates, setCandidates] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadCandidates();
  }, []);

  async function loadCandidates() {
    try {
      const response = await api.get("/candidates/");

      setCandidates(response.data.candidates);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id, status) {
    try {
      await api.put(`/candidates/${id}/status`, null, {
        params: {
          status: status,
        },
      });

      loadCandidates();

    } catch (error) {
      console.error(error);
      alert("Status Update Failed");
    }
  }

  async function deleteCandidate(id) {

    const confirmDelete = window.confirm(
      "Delete this candidate?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/candidates/${id}`);

      loadCandidates();

    } catch (error) {

      console.error(error);

      alert("Delete Failed");

    }

  }

  function openDetails(candidate) {
    setSelectedCandidate(candidate);

    setOpenModal(true);
  }

  const filteredCandidates = candidates.filter((candidate) => {

    const nameMatch =
      candidate.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All"
        ? true
        : candidate.status === statusFilter;

    return nameMatch && statusMatch;

  });

  if (loading) {
    return (
      <h2 className="text-center text-2xl">
        Loading Candidates...
      </h2>
    );
  }

  return (
    <>
      <div className="flex gap-4 mb-8">

        <input
          type="text"
          placeholder="Search Candidate..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 bg-slate-800 rounded-xl p-3"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="bg-slate-800 rounded-xl p-3"
        >

          <option>All</option>

          <option>Pending</option>

          <option>Shortlisted</option>

          <option>Rejected</option>

        </select>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        {filteredCandidates.map((candidate) => (

          <CandidateCard
            key={candidate.id}
            candidate={candidate}
            onView={openDetails}
            onDelete={deleteCandidate}
            onStatusChange={updateStatus}
          />

        ))}

      </div>

      <CandidateDetailsModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        candidate={selectedCandidate}
      />
    </>
  );
}

export default CandidateList;