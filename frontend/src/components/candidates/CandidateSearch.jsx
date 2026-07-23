function CandidateSearch({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4">

      <input
        type="text"
        placeholder="Search Candidate..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="flex-1 bg-white/10 border border-white/10 rounded-xl px-4 py-3 outline-none"
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-white/10 border border-white/10 rounded-xl px-4 py-3"
      >
        <option>All</option>
        <option>Shortlisted</option>
        <option>Pending</option>
        <option>Rejected</option>
      </select>

    </div>
  );
}

export default CandidateSearch;