function MonthlyHiringChart({ data }) {

  if (!data) return null;

  const max = Math.max(...data.map(i => i.count), 1);

  return (

    <div className="bg-white/5 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">

        Monthly Hiring

      </h2>

      <div className="space-y-5">

        {data.map((item) => (

          <div key={item.month}>

            <div className="flex justify-between mb-2">

              <span>{item.month}</span>

              <span>{item.count}</span>

            </div>

            <div className="w-full h-3 bg-white/10 rounded-full">

              <div

                className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"

                style={{

                  width: `${(item.count / max) * 100}%`

                }}

              />

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default MonthlyHiringChart;