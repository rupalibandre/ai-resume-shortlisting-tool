import NotificationBell from "./NotificationBell";

function Navbar() {
  return (
    <div className="flex justify-between items-center mb-8">

      <div>

        <h2 className="text-3xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-gray-400 mt-2">
          AI Recruitment Dashboard
        </p>

      </div>

      <div className="flex items-center gap-4">

        <NotificationBell />

        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="w-12 h-12 rounded-full"
        />

      </div>

    </div>
  );
}

export default Navbar;