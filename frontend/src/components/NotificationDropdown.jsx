function NotificationDropdown({

  notifications,
  markRead,

}) {

  return (

    <div className="absolute right-0 mt-4 w-96 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-50">

      <div className="p-5 border-b border-white/10">

        <h2 className="font-bold text-lg">
          Notifications
        </h2>

      </div>

      <div className="max-h-96 overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-8 text-center text-gray-400">

            No Notifications

          </div>

        ) : (

          notifications.map((item) => (

            <div
              key={item.id}
              onClick={() => markRead(item.id)}
              className={`p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition ${
                item.is_read
                  ? ""
                  : "bg-blue-500/10"
              }`}
            >

              <div className="flex justify-between">

                <h3 className="font-semibold">

                  {item.title}

                </h3>

                {!item.is_read && (

                  <span className="text-xs text-blue-400">

                    New

                  </span>

                )}

              </div>

              <p className="text-gray-400 text-sm mt-2">

                {item.message}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default NotificationDropdown;