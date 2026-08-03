function UpcomingInterviews({ interviews }) {

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Upcoming Interviews

      </h2>

      <div className="space-y-5">

        {interviews.length === 0 ? (

          <p className="text-gray-400">

            No interviews scheduled.

          </p>

        ) : (

          interviews.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 rounded-xl p-4"
            >

              <h3 className="font-semibold">

                {item.candidate}

              </h3>

              <p className="text-gray-400">

                {item.job}

              </p>

              <div className="flex justify-between mt-3 text-sm">

                <span>

                  📅 {item.date}

                </span>

                <span>

                  🕒 {item.time}

                </span>

              </div>

            </div>

          ))

        )}

      </div>

    </div>

  );

}

export default UpcomingInterviews;