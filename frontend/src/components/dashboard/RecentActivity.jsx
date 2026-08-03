function RecentActivity({ activities }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Recent Activity

      </h2>

      <div className="space-y-5">

        {activities.length === 0 ? (

          <p className="text-gray-400">

            No recent activities.

          </p>

        ) : (

          activities.map((item) => (

            <div
              key={item.id}
              className="border-b border-white/10 pb-4"
            >

              <h3 className="font-semibold">

                {item.title}

              </h3>

              <p className="text-gray-400 text-sm mt-1">

                {item.description}

              </p>

              <span className="text-xs text-blue-400">

                {item.type}

              </span>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default RecentActivity;