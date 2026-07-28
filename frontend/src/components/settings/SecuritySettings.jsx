import { useState } from "react";

function SecuritySettings() {

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  function handleChange(e) {

    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });

  }

  function changePassword() {

    if (
      passwords.newPassword !== passwords.confirm
    ) {

      alert("Passwords do not match ❌");

      return;

    }

    if (
      passwords.newPassword.length < 6
    ) {

      alert(
        "Password must be at least 6 characters."
      );

      return;

    }

    alert("Password Changed Successfully ✅");

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });

  }

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        Security
      </h2>

      <div className="space-y-5">

        <input
          type="password"
          name="current"
          value={passwords.current}
          onChange={handleChange}
          placeholder="Current Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="password"
          name="newPassword"
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="New Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <input
          type="password"
          name="confirm"
          value={passwords.confirm}
          onChange={handleChange}
          placeholder="Confirm Password"
          className="w-full bg-slate-900 rounded-xl p-4 outline-none"
        />

        <button
          onClick={changePassword}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl"
        >
          Change Password
        </button>

      </div>

    </div>
  );
}

export default SecuritySettings;