import UploadZone from "./UploadZone";
import ResumeList from "./ResumeList";

function ResumeUpload() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Resume Upload
        </h1>

        <p className="text-gray-400 mt-2">
          Upload resumes to analyze and shortlist candidates.
        </p>
      </div>

      <UploadZone />

      <ResumeList />

    </div>
  );
}

export default ResumeUpload;