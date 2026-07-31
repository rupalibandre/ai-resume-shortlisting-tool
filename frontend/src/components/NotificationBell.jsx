import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NotificationBell() {

  const navigate = useNavigate();

  const [count, setCount] = useState(0);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {

    try {

      const res = await api.get("/notifications/");

      const unread = res.data.filter(
        (item) => !item.is_read
      ).length;

      setCount(unread);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <button
      onClick={() => navigate("/notifications")}
      className="relative bg-white/10 p-3 rounded-xl hover:bg-white/20 transition"
    >

      <FaBell size={20} />

      {count > 0 && (

        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-xs flex justify-center items-center font-bold">

          {count}

        </span>

      )}

    </button>

  );

}

export default NotificationBell;