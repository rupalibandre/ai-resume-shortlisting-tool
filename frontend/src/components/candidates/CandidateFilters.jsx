function CandidateFilters({

  value,

  onChange,

}) {

  return (

    <select

      value={value}

      onChange={(e) => onChange(e.target.value)}

      className="bg-white/10 border border-white/10 rounded-xl px-4 py-3"

    >

      <option value="">All Status</option>

      <option value="Pending">Pending</option>

      <option value="Shortlisted">Shortlisted</option>

      <option value="Interview Scheduled">

        Interview

      </option>

      <option value="Selected">

        Selected

      </option>

      <option value="Rejected">

        Rejected

      </option>

    </select>

  );

}

export default CandidateFilters;