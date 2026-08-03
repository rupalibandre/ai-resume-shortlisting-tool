function CandidatePagination({

  page,

  total,

  limit,

  onChange,

}) {

  const totalPages = Math.ceil(total / limit);

  return (

    <div className="flex justify-center gap-3 mt-8">

      <button

        disabled={page === 1}

        onClick={() => onChange(page - 1)}

        className="bg-white/10 px-4 py-2 rounded-xl disabled:opacity-50"

      >

        Previous

      </button>

      <span className="flex items-center">

        Page {page} / {totalPages || 1}

      </span>

      <button

        disabled={page === totalPages || totalPages === 0}

        onClick={() => onChange(page + 1)}

        className="bg-white/10 px-4 py-2 rounded-xl disabled:opacity-50"

      >

        Next

      </button>

    </div>

  );

}

export default CandidatePagination;