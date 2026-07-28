import { useState } from "react";

function CompanySettings() {

  const [company, setCompany] = useState({
    name: "AI Recruit Pvt Ltd",
    website: "www.airecruit.com",
    location: "Pune",
  });

  function handleChange(e) {

    setCompany({
      ...company,
      [e.target.name]: e.target.value,
    });

  }

  function saveCompany() {

    localStorage.setItem(
      "company_settings",
      JSON.stringify(company)
    );

    alert("Company Information Saved Successfully ✅");

  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Company Information
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          name="name"
          value={company.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          name="website"
          value={company.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          name="location"
          value={company.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <button
          onClick={saveCompany}
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl"
        >
          Save Company
        </button>

      </div>

    </div>
  );
}

export default CompanySettings;