import api from "../../services/api";

import {
  FaFileExcel,
  FaFilePdf,
} from "react-icons/fa";

function ExportButtons() {

  async function exportExcel(){

    try{

      const response = await api.get(

        "/reports/excel",

        {

          responseType:"blob",

        }

      );

      const blob = new Blob([response.data]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = "Recruitment_Report.xlsx";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

    }

    catch(err){

      console.log(err);

      alert("Excel Export Failed");

    }

  }

  function exportPDF(){

      window.print();

  }

  return (

    <div className="flex gap-4">

      <button

        onClick={exportPDF}

        className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl transition"

      >

        <FaFilePdf />

        Export PDF

      </button>

      <button

        onClick={exportExcel}

        className="flex items-center gap-3 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl transition"

      >

        <FaFileExcel />

        Export Excel

      </button>

    </div>

  );

}

export default ExportButtons;