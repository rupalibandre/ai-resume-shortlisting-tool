import { useEffect, useState } from "react";

function JobForm({ onSave, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: "",
    experience: "",
    location: "",
    status: "Active",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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

    if (initialData) {
      onSave(formData);
    } else {
      onSave({
        id: Date.now(),
        ...formData,
      });
    }

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
        name="experience"
        placeholder="Experience"
        value={formData.experience}
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
          {initialData ? "Update Job" : "Save Job"}
        </button>
      </div>
    </form>
  );
}

export default JobForm;