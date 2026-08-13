import { useEffect, useState } from "react";

function JobForm({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    department: "General",
    location: "",
    employment_type: "Full Time",
    experience: "",
    salary: "",
    skills: "",
    description: "",
    vacancies: 1,
    deadline: "",
    recruiter: "HR Manager",
    priority: "Medium",
    status: "Open",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        department: initialData.department || "General",
        location: initialData.location || "",
        employment_type:
          initialData.employment_type || "Full Time",
        experience: initialData.experience || "",
        salary: initialData.salary || "",
        skills: initialData.skills || "",
        description: initialData.description || "",
        vacancies: initialData.vacancies || 1,
        deadline: initialData.deadline || "",
        recruiter: initialData.recruiter || "HR Manager",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Open",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSave({
      ...formData,
      vacancies: Number(formData.vacancies),
    });
  }

  return (
    <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        {/* JOB TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* COMPANY */}
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* DEPARTMENT */}
        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* LOCATION */}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* EMPLOYMENT TYPE */}
        <select
          name="employment_type"
          value={formData.employment_type}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        >
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>

        {/* EXPERIENCE */}
        <input
          type="text"
          name="experience"
          placeholder="Experience (Example: 2-4 Years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* SALARY */}
        <input
          type="text"
          name="salary"
          placeholder="Salary (Example: ₹20,000 - ₹40,000)"
          value={formData.salary}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        {/* SKILLS */}
        <textarea
          name="skills"
          placeholder="Skills (Example: Python, Java, FastAPI)"
          value={formData.skills}
          onChange={handleChange}
          rows="3"
          className="w-full p-3 rounded-xl bg-slate-800 text-white resize-none"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          rows="5"
          className="w-full p-3 rounded-xl bg-slate-800 text-white resize-none"
          required
        />

        {/* VACANCIES */}
        <input
          type="number"
          name="vacancies"
          placeholder="Number of Vacancies"
          min="1"
          value={formData.vacancies}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* DEADLINE */}
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        />

        {/* RECRUITER */}
        <input
          type="text"
          name="recruiter"
          placeholder="Recruiter Name"
          value={formData.recruiter}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
          required
        />

        {/* PRIORITY */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* STATUS */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full p-3 rounded-xl bg-slate-800 text-white"
        >
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>

        {/* BUTTONS */}
        <div className="sticky bottom-0 bg-slate-900 pt-4 pb-2 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-600 hover:bg-gray-700 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {initialData ? "Update Job" : "Save Job"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default JobForm;