function ProfileSettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Recruiter Profile
      </h2>

      <div className="space-y-5">

        <input
          type="text"
          placeholder="Full Name"
          defaultValue="Rupali Bandre"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          defaultValue="hr@company.com"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="text"
          placeholder="Designation"
          defaultValue="HR Manager"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl">
          Save Profile
        </button>

      </div>

    </div>
  );
}

export default ProfileSettings;