import { useState } from "react";
import { FaLock, FaSave } from "react-icons/fa";
import api from "../../services/api";

function SecuritySettings() {

  const [form, setForm] = useState({

    current_password: "",
    new_password: "",
    confirm_password: "",

  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  }

  async function changePassword() {

    if (form.new_password !== form.confirm_password) {

      alert("Passwords do not match ❌");

      return;

    }

    if (form.new_password.length < 6) {

      alert("Password must be at least 6 characters.");

      return;

    }

    try {

      setLoading(true);

      await api.put("/settings/password", {

        current_password: form.current_password,

        new_password: form.new_password,

      });

      alert("Password Changed Successfully ✅");

      setForm({

        current_password: "",

        new_password: "",

        confirm_password: "",

      });

    }

    catch (err) {

      console.log(err);

      alert(

        err.response?.data?.detail ||

        "Unable to Change Password"

      );

    }

    finally {

      setLoading(false);

    }

  }

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">

      <div className="flex items-center gap-4 mb-8">

        <div className="bg-red-600 p-4 rounded-2xl text-2xl">

          <FaLock />

        </div>

        <div>

          <h2 className="text-3xl font-bold">

            Security Settings

          </h2>

          <p className="text-gray-400">

            Change your account password securely

          </p>

        </div>

      </div>

      <div className="space-y-6">

        <div>

          <label className="block mb-2">

            Current Password

          </label>

          <input

            type="password"

            name="current_password"

            value={form.current_password}

            onChange={handleChange}

            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none focus:border-red-500"

            placeholder="Enter current password"

          />

        </div>

        <div>

          <label className="block mb-2">

            New Password

          </label>

          <input

            type="password"

            name="new_password"

            value={form.new_password}

            onChange={handleChange}

            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none focus:border-red-500"

            placeholder="Enter new password"

          />

        </div>

        <div>

          <label className="block mb-2">

            Confirm Password

          </label>

          <input

            type="password"

            name="confirm_password"

            value={form.confirm_password}

            onChange={handleChange}

            className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 outline-none focus:border-red-500"

            placeholder="Confirm new password"

          />

        </div>

      </div>

      <div className="flex justify-end mt-8">

        <button

          onClick={changePassword}

          disabled={loading}

          className="flex items-center gap-3 bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition-all disabled:opacity-60"

        >

          <FaSave />

          {

            loading

              ? "Updating..."

              : "Change Password"

          }

        </button>

      </div>

    </div>

  );

}

export default SecuritySettings;