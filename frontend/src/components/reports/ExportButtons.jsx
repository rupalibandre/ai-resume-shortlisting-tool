import api from "../../services/api";

function ExportButtons() {

  async function exportPDF() {

    try {

      window.print();

      alert("PDF Ready ✅");

    } catch (err) {

      console.log(err);

      alert("PDF Export Failed");

    }

  }

  async function exportExcel() {

    try {

      const response = await api.get(
        "/reports/excel",
        {
          responseType: "blob",
        }
      );

      const blob = new Blob([
        response.data
      ]);

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;

      link.download = `Candidates_Report_${new Date()
        .toISOString()
        .slice(0,10)}.xlsx`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      alert("Excel Report Downloaded Successfully ✅");

    } catch (err) {

      console.log(err);

      alert("Excel Export Failed ❌");

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