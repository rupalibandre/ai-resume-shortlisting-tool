function SkillMatch() {
  const skills = [
    { name: "React", value: 95 },
    { name: "JavaScript", value: 90 },
    { name: "Node.js", value: 82 },
    { name: "MongoDB", value: 76 },
    { name: "Communication", value: 88 },
  ];

  return (
    <div className="bg-white/10 border border-white/10 rounded-2xl p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Skill Match
      </h2>

      {skills.map((skill) => (
        <div key={skill.name} className="mb-5">

          <div className="flex justify-between mb-2">
            <span>{skill.name}</span>
            <span>{skill.value}%</span>
          </div>

          <div className="w-full h-3 bg-slate-700 rounded-full">

            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{ width: `${skill.value}%` }}
            />

          </div>

        </div>
      ))}

    </div>
  );
}

export default SkillMatch;