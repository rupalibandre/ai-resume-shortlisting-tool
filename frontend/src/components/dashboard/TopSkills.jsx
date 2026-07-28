function TopSkills() {

  const skills = [
    "Python",
    "FastAPI",
    "React",
    "JavaScript",
    "SQL",
    "PostgreSQL",
    "Machine Learning",
    "Communication",
    "Problem Solving",
    "Git & GitHub",
  ];

  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 h-[350px]">

      <h2 className="text-2xl font-semibold mb-6">
        Most Demanded Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {skills.map((skill) => (

          <span
            key={skill}
            className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
          >
            {skill}
          </span>

        ))}

      </div>

      <div className="mt-8 text-gray-400 text-sm">

        Skills shown here represent the most commonly
        required technologies across uploaded job
        descriptions.

      </div>

    </div>
  );
}

export default TopSkills;