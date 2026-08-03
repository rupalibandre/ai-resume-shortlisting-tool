import { useEffect, useState } from "react";

import api from "../services/api";

import CandidateTable from "../components/candidates/CandidateTable";
import CandidateSearch from "../components/candidates/CandidateSearch";
import CandidateFilters from "../components/candidates/CandidateFilters";
import CandidatePagination from "../components/candidates/CandidatePagination";

function Candidates() {

  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);

  const [total, setTotal] = useState(0);

  const limit = 10;

  useEffect(() => {

    loadCandidates();

  }, [search, status, page]);

  async function loadCandidates() {

    try {

      const res = await api.get("/candidates", {

        params: {

          search,

          status,

          page,

          limit,

          sort: "match",

        },

      });

      setData(res.data.data);

      setTotal(res.data.total);

    } catch (err) {

      console.log(err);

    }

  }

  async function deleteCandidate(id) {

    if (!window.confirm("Delete Candidate?"))

      return;

    await api.delete(`/candidates/${id}`);

    loadCandidates();

  }

  function viewCandidate(id) {

    window.location.href = `/candidate/${id}`;

  }

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">

          Candidates

        </h1>

        <p className="text-gray-400 mt-2">

          AI Resume Management

        </p>

      </div>

      <div className="flex justify-between">

        <CandidateSearch

          value={search}

          onChange={setSearch}

        />

        <CandidateFilters

          value={status}

          onChange={setStatus}

        />

      </div>

      <div className="bg-white/10 rounded-2xl p-6">

        <CandidateTable

          candidates={data}

          onView={viewCandidate}

          onDelete={deleteCandidate}

        />

      </div>

      <CandidatePagination

        page={page}

        total={total}

        limit={limit}

        onChange={setPage}

      />

    </div>

  );

}

export default Candidates;