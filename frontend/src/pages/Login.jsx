import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary Login
    navigate("/dashboard");
  };

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
          className="w-full mt-8 p-4 rounded-xl bg-white/10 outline-none border border-white/20"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-5 p-4 rounded-xl bg-white/10 outline-none border border-white/20"
        />

        <button
          className="w-full mt-8 p-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;