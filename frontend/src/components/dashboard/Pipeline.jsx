function Pipeline({ data }) {

  const steps = [
    {
      title: "Pending",
      value: data.pending,
      color: "bg-gray-500",
    },
    {
      title: "Shortlisted",
      value: data.shortlisted,
      color: "bg-blue-600",
    },
    {
      title: "Interview",
      value: data.interview,
      color: "bg-yellow-500",
    },
    {
      title: "Selected",
      value: data.selected,
      color: "bg-green-600",
    },
    {
      title: "Rejected",
      value: data.rejected,
      color: "bg-red-600",
    },
  ];

  return (

    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Hiring Pipeline

      </h2>

      <div className="space-y-5">

        {steps.map((item) => (

          <div key={item.title}>

            <div className="flex justify-between mb-2">

              <span>

                {item.title}

              </span>

              <span className="font-bold">

                {item.value}

              </span>

            </div>

            <div className="h-3 rounded-full bg-white/10">

              <div
                className={`${item.color} h-3 rounded-full transition-all duration-500`}
                style={{
                  width: `${Math.min(item.value * 10, 100)}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Pipeline;