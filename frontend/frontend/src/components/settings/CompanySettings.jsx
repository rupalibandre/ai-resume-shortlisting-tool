function CompanySettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Company Information
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Company Name"
          defaultValue="AI Recruit Pvt Ltd"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Website"
          defaultValue="www.airecruit.com"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Location"
          defaultValue="Pune"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl">
          Save Company
        </button>

      </div>

    </div>
  );
}

export default CompanySettings;