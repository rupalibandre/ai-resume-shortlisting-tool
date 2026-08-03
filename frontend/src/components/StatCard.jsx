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

const colors = {
  blue: {
    border: "border-l-4 border-blue-500",
    icon: "bg-blue-500/15 text-blue-400",
  },
  purple: {
    border: "border-l-4 border-violet-500",
    icon: "bg-violet-500/15 text-violet-400",
  },
  green: {
    border: "border-l-4 border-emerald-500",
    icon: "bg-emerald-500/15 text-emerald-400",
  },
  orange: {
    border: "border-l-4 border-amber-500",
    icon: "bg-amber-500/15 text-amber-400",
  },
  red: {
    border: "border-l-4 border-rose-500",
    icon: "bg-rose-500/15 text-rose-400",
  },
  cyan: {
    border: "border-l-4 border-cyan-500",
    icon: "bg-cyan-500/15 text-cyan-400",
  },
  indigo: {
    border: "border-l-4 border-indigo-500",
    icon: "bg-indigo-500/15 text-indigo-400",
  },
};

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

function StatCard({ title, value, color = "blue" }) {
  const Icon = icons[title] || Briefcase;
  const theme = colors[color] || colors.blue;

  return (
    <div
      className={`
        ${theme.border}
        bg-slate-800
        rounded-2xl
        p-6
        shadow-lg
        hover:shadow-blue-500/10
        hover:-translate-y-1
        transition-all
        duration-300
      `}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {value}
          </h2>

          <p className="text-xs text-slate-500 mt-4">
            Live Statistics
          </p>
        </div>

        <div
          className={`
            ${theme.icon}
            w-16
            h-16
            rounded-xl
            flex
            items-center
            justify-center
          `}
        >
          <Icon size={30} />
        </div>
      </div>
    </div>
  );
}

export default StatCard;