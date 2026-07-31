import { useEffect, useState } from "react";
import api from "../services/api";

function Notifications() {

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {

    try {

      const res = await api.get("/notifications/");

      setNotifications(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  }

  async function markAsRead(id) {

    try {

      await api.put(`/notifications/${id}/read`);

      loadNotifications();

    } catch (err) {

      console.log(err);

    }

  }

  async function markAllRead() {

    try {

      await api.put("/notifications/read-all");

      loadNotifications();

    } catch (err) {

      console.log(err);

    }

  }

  async function deleteNotification(id) {

    if (!window.confirm("Delete this notification?")) return;

    try {

      await api.delete(`/notifications/${id}`);

      loadNotifications();

    } catch (err) {

      console.log(err);

    }

  }

  if (loading) {

    return (
      <div className="text-center text-2xl mt-20">
        Loading Notifications...
      </div>
    );

  }

  return (

    <div>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            Notifications
          </h1>

          <p className="text-gray-400 mt-2">
            Recruitment Activity Notifications
          </p>

        </div>

        <button
          onClick={markAllRead}
          className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
        >
          Mark All Read
        </button>

      </div>

      {

        notifications.length === 0 ? (

          <div className="bg-white/10 rounded-2xl p-10 text-center text-gray-400">

            No Notifications Available

          </div>

        ) : (

          <div className="space-y-5">

            {

              notifications.map((item) => (

                <div
                  key={item.id}
                  className={`rounded-2xl border p-6 transition ${
                    item.is_read
                      ? "bg-white/5 border-white/10"
                      : "bg-blue-900/30 border-blue-500"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h2 className="text-xl font-bold">

                        {item.title}

                      </h2>

                      <p className="text-gray-300 mt-2">

                        {item.message}

                      </p>

                      <p className="text-sm text-gray-500 mt-3">

                        {item.created_at}

                      </p>

                    </div>

                    <div className="flex gap-3">

                      {

                        !item.is_read && (

                          <button
                            onClick={() => markAsRead(item.id)}
                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                          >
                            Read
                          </button>

                        )

                      }

                      <button
                        onClick={() => deleteNotification(item.id)}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </div>

  );

}

export default Notifications;