function CandidateSearch({

  value,

  onChange,

}) {

  return (

    <input
      type="text"
      placeholder="Search Candidate..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 w-80 outline-none focus:border-blue-500"
    />

  );

}

export default CandidateSearch;