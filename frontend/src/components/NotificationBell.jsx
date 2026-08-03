import { useEffect, useRef, useState } from "react";
import { FaBell } from "react-icons/fa";
import api from "../services/api";
import NotificationDropdown from "./NotificationDropdown";

function NotificationBell() {

  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 10000);

    return () => clearInterval(interval);

  }, []);

  useEffect(() => {

    function handleClickOutside(e) {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {

        setOpen(false);

      }

    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  async function loadNotifications() {

    try {

      const res = await api.get("/notifications/");

      setNotifications(res.data);

      const unread = res.data.filter(
        (n) => !n.is_read
      ).length;

      setCount(unread);

    } catch (err) {

      console.log(err);

    }

  }

  async function markRead(id) {

    try {

      await api.put(`/notifications/${id}`);

      loadNotifications();

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div className="relative" ref={dropdownRef}>

      <button
        onClick={() => setOpen(!open)}
        className="relative bg-white/10 hover:bg-white/20 transition p-3 rounded-xl"
      >

        <FaBell size={20} />

        {count > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center">

            {count}

          </span>

        )}

      </button>

      {open && (

        <NotificationDropdown
          notifications={notifications}
          markRead={markRead}
        />

      )}

    </div>

  );

}

export default NotificationBell;