import api from "../../services/api";

function ExportButtons() {

  async function exportPDF() {

    window.print();

  }

  async function exportExcel() {

    try {

      const response = await api.get(
        "/reports/excel",
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;

      link.setAttribute(
        "download",
        "Candidates_Report.xlsx"
      );

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {

      console.log(err);

      alert("Excel Export Failed");

    }

  }

  return (

    <div className="flex gap-4">

      <button
        onClick={exportPDF}
        className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl"
      >
        Export PDF
      </button>

      <button
        onClick={exportExcel}
        className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
      >
        Export Excel
      </button>

    </div>

  );

}

export default ExportButtons;