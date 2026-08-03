import {
  Briefcase,
  Users,
  UserCheck,
  Calendar,
  CheckCircle,
  XCircle,
  Brain,
  Award,
} from "lucide-react";


const icons = {
  Jobs: Briefcase,
  Candidates: Users,
  Shortlisted: UserCheck,
  Interview: Calendar,
  Selected: CheckCircle,
  Rejected: XCircle,
  "Average Match": Brain,
  "Highest Match": Award,
};



function StatCard({ title, value }) {

  const Icon = icons[title] || Briefcase;


  return (

    <div
      className="
      rounded-3xl
      p-[1px]
      bg-gradient-to-br
      from-cyan-400
      via-blue-500
      to-violet-600
      shadow-[0_0_35px_rgba(59,130,246,0.35)]
      "
    >

      <div
        className="
        relative
        overflow-hidden
        rounded-3xl
        p-6
        bg-[#080D1A]
        hover:scale-[1.02]
        transition-all
        duration-500
        group
        "
      >


        {/* Background Glow */}

        <div
          className="
          absolute
          -top-24
          -right-24
          w-64
          h-64
          rounded-full
          blur-3xl
          bg-gradient-to-br
          from-cyan-400/30
          via-blue-500/25
          to-violet-600/30
          group-hover:scale-125
          transition-transform
          duration-700
          "
        />



        {/* Glass Effect */}

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-br
          from-white/10
          via-transparent
          to-transparent
          opacity-20
          "
        />



        <div
          className="
          relative
          z-10
          flex
          justify-between
          items-center
          "
        >



          {/* Text */}

          <div>

            <p
              className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-slate-400
              "
            >
              {title}
            </p>



            <h2
              className="
              mt-3
              text-4xl
              font-bold
              text-white
              "
            >
              {value}
            </h2>



            <div
              className="
              mt-3
              flex
              items-center
              gap-2
              text-xs
              text-cyan-300
              "
            >

              <span
                className="
                w-2
                h-2
                rounded-full
                bg-cyan-400
                animate-pulse
                "
              />

              AI Powered Analytics

            </div>


          </div>





          {/* Icon */}

          <div
            className="
            w-16
            h-16
            rounded-2xl
            flex
            items-center
            justify-center
            bg-white/10
            border
            border-white/20
            text-cyan-300
            backdrop-blur-xl
            shadow-[0_0_25px_rgba(34,211,238,0.25)]
            "
          >

            <Icon size={32}/>

          </div>


        </div>


      </div>


    </div>

  );

}


export default StatCard;