import {
  FaUsers,
  FaUserCheck,
  FaUserTimes,
  FaBriefcase,
} from "react-icons/fa";

const statsConfig = [

  {
    title: "Total Candidates",
    key: "total_candidates",
    icon: FaUsers,
    color: "from-blue-500 to-cyan-500",
    glow: "shadow-blue-500/30",
  },

  {
    title: "Shortlisted",
    key: "shortlisted",
    icon: FaUserCheck,
    color: "from-green-500 to-emerald-500",
    glow: "shadow-green-500/30",
  },

  {
    title: "Rejected",
    key: "rejected",
    icon: FaUserTimes,
    color: "from-red-500 to-rose-500",
    glow: "shadow-red-500/30",
  },

  {
    title: "Open Jobs",
    key: "total_jobs",
    icon: FaBriefcase,
    color: "from-violet-500 to-indigo-500",
    glow: "shadow-violet-500/30",
  },

];

function ReportStats({ report }) {

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {statsConfig.map((item) => {

        const Icon = item.icon;

        return (

          <div
            key={item.title}
            className={`
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              p-6
              transition-all
              duration-500
              hover:-translate-y-2
              hover:shadow-2xl
              ${item.glow}
              group
            `}
          >

            {/* Background Glow */}

            <div
              className={`
                absolute
                -top-14
                -right-12
                h-36
                w-36
                rounded-full
                bg-gradient-to-br
                ${item.color}
                blur-3xl
                opacity-25
                group-hover:scale-125
                transition-all
                duration-700
              `}
            />

            {/* Icon */}

            <div
              className={`
                relative
                w-16
                h-16
                rounded-2xl
                flex
                items-center
                justify-center
                bg-gradient-to-br
                ${item.color}
                text-white
                shadow-lg
              `}
            >

              <Icon size={28} />

            </div>

            {/* Text */}

            <p className="relative mt-6 text-gray-400 text-sm">

              {item.title}

            </p>

            <h2 className="relative text-4xl font-bold mt-2 text-white">

              {report[item.key]}

            </h2>

            {/* Bottom Line */}

            <div
              className={`
                mt-5
                h-1
                rounded-full
                bg-gradient-to-r
                ${item.color}
              `}
            />

          </div>

        );

      })}

    </div>

  );

}

export default ReportStats;