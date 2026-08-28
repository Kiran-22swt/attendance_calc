import { useEffect, useState } from "react";
import { getDashboard } from "../lib/api.js";
import SubjectCard from "../components/SubjectCard.jsx";

export default function Dashboard() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboard()
      .then((data) => setSubjects(data.subjects))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (subjects.length === 0) {
    return <p className="text-gray-500">No subjects yet. Add one to get started.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((s) => (
        <SubjectCard key={s.id} subject={s} />
      ))}
    </div>
  );
}