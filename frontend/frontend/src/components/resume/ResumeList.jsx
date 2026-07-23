import ResumeCard from "./ResumeCard";

const resumes = [
  {
    id: 1,
    name: "Rahul_Shinde.pdf",
    score: 92,
    status: "Shortlisted",
  },
  {
    id: 2,
    name: "Priya_Patil.pdf",
    score: 84,
    status: "Pending",
  },
  {
    id: 3,
    name: "Aman_Kumar.pdf",
    score: 68,
    status: "Rejected",
  },
];

function ResumeList() {
  return (
    <div className="space-y-4">

      <h2 className="text-2xl font-bold">
        Recent Uploads
      </h2>

      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          name={resume.name}
          score={resume.score}
          status={resume.status}
        />
      ))}

    </div>
  );
}

export default ResumeList;