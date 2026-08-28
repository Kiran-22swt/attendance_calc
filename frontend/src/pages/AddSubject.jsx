import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSubject } from "../lib/api.js";

const initial = {
  name: "",
  faculty_name: "",
  required_percent: 75,
  total_classes: 0,
  attended_classes: 0,
  color: "#3b82f6",
  icon: "book",
};

export default function AddSubject() {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (Number(form.attended_classes) > Number(form.total_classes)) {
      setError("Attended can't exceed total classes.");
      return;
    }
    try {
      await createSubject({
        ...form,
        required_percent: Number(form.required_percent),
        total_classes: Number(form.total_classes),
        attended_classes: Number(form.attended_classes),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create subject.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-3">
      <h2 className="text-xl font-bold">Add Subject</h2>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <input name="name" placeholder="Subject name" value={form.name} onChange={handleChange} required className="border p-2 rounded-lg" />
      <input name="faculty_name" placeholder="Faculty name" value={form.faculty_name} onChange={handleChange} className="border p-2 rounded-lg" />
      <input name="required_percent" type="number" placeholder="Required %" value={form.required_percent} onChange={handleChange} className="border p-2 rounded-lg" />
      <input name="total_classes" type="number" placeholder="Current total classes" value={form.total_classes} onChange={handleChange} className="border p-2 rounded-lg" />
      <input name="attended_classes" type="number" placeholder="Current attended classes" value={form.attended_classes} onChange={handleChange} className="border p-2 rounded-lg" />
      <input name="color" type="color" value={form.color} onChange={handleChange} className="h-10 rounded-lg" />
      <button type="submit" className="bg-blue-600 text-white rounded-lg py-2 font-medium">Add Subject</button>
    </form>
  );
}