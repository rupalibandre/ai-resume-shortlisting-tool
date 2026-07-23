function SecuritySettings() {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Security
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          placeholder="Current Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="password"
          placeholder="New Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl">
          Change Password
        </button>

      </div>

    </div>
  );
}

export default SecuritySettings;