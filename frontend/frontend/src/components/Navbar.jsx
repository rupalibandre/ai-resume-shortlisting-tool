import NotificationBell from "./NotificationBell";

function Navbar({ user }) {
  return (
    <div className="flex justify-between items-center px-8 py-5 border-b border-white/10 bg-white/5 backdrop-blur-xl">

      <div>

        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mt-2">
          AI Recruitment Dashboard
        </p>

      </div>

      <div className="flex items-center gap-5">

        <NotificationBell />

        <div className="text-right">

          <h3 className="font-semibold text-lg">
            {user ? user.full_name : "Loading..."}
          </h3>

          <p className="text-sm text-gray-400">
            {user ? user.role : ""}
          </p>

          <p className="text-xs text-gray-500">
            {user ? user.email : ""}
          </p>

        </div>

        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-blue-500"
        />

      </div>

    </div>
  );
}

export default Navbar;