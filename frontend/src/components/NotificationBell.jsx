import { FaBell } from "react-icons/fa";

function NotificationBell() {
  return (
    <button className="relative bg-white/10 p-3 rounded-xl hover:bg-white/20">

      <FaBell />

      <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-xs flex justify-center items-center">
        3
      </span>

    </button>
  );
}

export default NotificationBell;