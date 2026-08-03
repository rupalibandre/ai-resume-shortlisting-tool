import {
  FaPlus,
  FaUpload,
  FaUserTie,
  FaChartBar,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function QuickActions() {

  const navigate = useNavigate();

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Quick Actions

      </h2>

      <div className="grid grid-cols-4 gap-5">

        <button
          onClick={() => navigate("/jobs")}
          className="bg-blue-600 hover:bg-blue-700 rounded-xl p-5 transition"
        >

          <FaPlus
            size={24}
            className="mx-auto mb-3"
          />

          Add Job

        </button>

        <button
          onClick={() => navigate("/upload-resume")}
          className="bg-green-600 hover:bg-green-700 rounded-xl p-5 transition"
        >

          <FaUpload
            size={24}
            className="mx-auto mb-3"
          />

          Upload Resume

        </button>

        <button
          onClick={() => navigate("/candidates")}
          className="bg-purple-600 hover:bg-purple-700 rounded-xl p-5 transition"
        >

          <FaUserTie
            size={24}
            className="mx-auto mb-3"
          />

          Candidates

        </button>

        <button
          onClick={() => navigate("/reports")}
          className="bg-orange-500 hover:bg-orange-600 rounded-xl p-5 transition"
        >

          <FaChartBar
            size={24}
            className="mx-auto mb-3"
          />

          Reports

        </button>

      </div>

    </div>

  );

}

export default QuickActions;