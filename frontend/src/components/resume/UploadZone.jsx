import { FaCloudUploadAlt } from "react-icons/fa";

function UploadZone() {
  return (
    <div className="border-2 border-dashed border-blue-500 rounded-3xl p-16 bg-white/5 text-center hover:bg-white/10 transition">

      <FaCloudUploadAlt
        className="mx-auto text-blue-400"
        size={80}
      />

      <h2 className="text-3xl font-bold mt-6">
        Drag & Drop Resume Here
      </h2>

      <p className="text-gray-400 mt-3">
        Supported formats: PDF, DOC, DOCX
      </p>

      <label
        htmlFor="resume-upload"
        className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl cursor-pointer"
      >
        Browse Resume
      </label>

      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
      />

    </div>
  );
}

export default UploadZone;