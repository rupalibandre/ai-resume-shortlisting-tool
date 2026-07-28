import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      alert("Login Successful ✅");

      navigate("/dashboard");

    } catch (error) {

      console.error(error);

      alert("Invalid Email or Password ❌");

    } finally {

      setLoading(false);

    }

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-purple-900 flex justify-center items-center">

      <form
        onSubmit={handleLogin}
        className="w-[420px] rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-10 shadow-2xl"
      >

        <h1 className="text-4xl font-bold text-center">
          Welcome HR
        </h1>

        <p className="text-center text-gray-300 mt-3">
          AI Resume Shortlisting Tool
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-8 p-4 rounded-xl bg-white/10 outline-none border border-white/20"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-5 p-4 rounded-xl bg-white/10 outline-none border border-white/20"
          required
        />

        <button
          disabled={loading}
          className="w-full mt-8 p-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login;