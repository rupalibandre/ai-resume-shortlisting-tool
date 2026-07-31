import { useState } from "react";
import api from "../../services/api";

function InterviewModal({
  open,
  onClose,
  candidateId,
  onSuccess,
}) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    interview_date: "",
    interview_time: "",
    interview_mode: "Online",
    interviewer_name: "",
    interview_round: "HR Round",
    meeting_link: "",
    location: "",
    notes: "",
  });

  if (!open) return null;

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function saveInterview() {

    if (
      !form.interview_date ||
      !form.interview_time ||
      !form.interviewer_name
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {

      setLoading(true);

      await api.put(
        `/interview/${candidateId}`,
        form
      );

      alert("Interview Scheduled Successfully");

      onSuccess();

      onClose();

    } catch (err) {

      console.log(err);

      alert("Unable to schedule interview");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <div className="bg-slate-900 w-full max-w-2xl rounded-2xl p-8 border border-white/10">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-3xl font-bold">

            Schedule Interview

          </h2>

          <button
            onClick={onClose}
            className="text-3xl"
          >
            ×
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label>Date</label>

            <input
              type="date"
              name="interview_date"
              value={form.interview_date}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />

          </div>

          <div>

            <label>Time</label>

            <input
              type="time"
              name="interview_time"
              value={form.interview_time}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />

          </div>

          <div>

            <label>Interviewer</label>

            <input
              type="text"
              name="interviewer_name"
              value={form.interviewer_name}
              onChange={handleChange}
              placeholder="John Smith"
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />

          </div>

          <div>

            <label>Interview Mode</label>

            <select
              name="interview_mode"
              value={form.interview_mode}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            >

              <option>Online</option>

              <option>Offline</option>

            </select>

          </div>

          <div>

            <label>Interview Round</label>

            <select
              name="interview_round"
              value={form.interview_round}
              onChange={handleChange}
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            >

              <option>HR Round</option>

              <option>Technical Round</option>

              <option>Manager Round</option>

              <option>Final Round</option>

            </select>

          </div>

          <div>

            <label>Meeting Link</label>

            <input
              type="text"
              name="meeting_link"
              value={form.meeting_link}
              onChange={handleChange}
              placeholder="https://meet.google.com/..."
              className="w-full mt-2 p-3 rounded-xl bg-slate-800"
            />

          </div>

        </div>

        <div className="mt-5">

          <label>Office Location</label>

          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Company Office / Address"
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          />

        </div>

        <div className="mt-5">

          <label>Notes</label>

          <textarea
            rows="4"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-xl bg-slate-800"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="bg-gray-700 px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={saveInterview}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl"
          >

            {loading
              ? "Scheduling..."
              : "Schedule Interview"}

          </button>

        </div>

      </div>

    </div>

  );

}

export default InterviewModal;