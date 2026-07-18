import { topSkills } from "../../data/dashboardData";

function TopSkills() {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10">

      <h2 className="text-2xl font-semibold mb-6">
        Top Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {topSkills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-blue-600"
          >
            {skill}
          </span>
        ))}

      </div>

    </div>
  );
}

export default TopSkills;