function ExportButtons() {
  return (
    <div className="flex gap-4">

      <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl">
        Export PDF
      </button>

      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl">
        Export Excel
      </button>

    </div>
  );
}

export default ExportButtons;