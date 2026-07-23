import { useEffect, useState } from "react";

function JobForm({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    experience: "",
    skills: "",
    description: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        location: initialData.location || "",
        experience: initialData.experience || "",
        skills: initialData.skills || "",
        description: initialData.description || "",
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

    onSave(formData);

    onClose();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <input
        type="text"
        name="company"
        placeholder="Company Name"
        value={formData.company}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <input
        type="text"
        name="experience"
        placeholder="Experience (Example: 1-3 Years)"
        value={formData.experience}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <textarea
        name="skills"
        placeholder="Skills (Example: Python, FastAPI, PostgreSQL)"
        value={formData.skills}
        onChange={handleChange}
        rows="3"
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <textarea
        name="description"
        placeholder="Job Description"
        value={formData.description}
        onChange={handleChange}
        rows="5"
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-gray-600"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-blue-600"
        >
          {initialData ? "Update Job" : "Save Job"}
        </button>
      </div>
    </form>
  );
}

export default JobForm;