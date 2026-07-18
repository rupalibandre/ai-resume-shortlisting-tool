import { useState } from "react";

function JobForm({ onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: "",
    experience: "",
    location: "",
    status: "Active",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      ...formData,
    };

    onSave(newJob);

    setFormData({
      title: "",
      experience: "",
      location: "",
      status: "Active",
    });

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <input
        name="experience"
        placeholder="Experience"
        value={formData.experience}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
        required
      />

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-3 rounded-xl bg-slate-800"
      >
        <option>Active</option>
        <option>Closed</option>
      </select>

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
          Save Job
        </button>
      </div>
    </form>
  );
}

export default JobForm;