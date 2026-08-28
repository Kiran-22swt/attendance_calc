import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSharedView } from "../lib/api.js";

const statusColor = {
  safe: "bg-green-100 text-green-700 border-green-300",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  danger: "bg-red-100 text-red-700 border-red-300",
};

export default function SharedView() {
  const { token } = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    getSharedView(token)
      .then(setData)
      .catch(() => setError(true));
  }, [token]);

  if (error) return <div className="p-6">Link invalid or expired.</div>;
  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-xl font-bold mb-4">Attendance Snapshot</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
        {data.subjects.map((s, i) => (
          <div key={i} className="border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{s.name}</h3>
              <span className={`text-xs px-2 py-1 rounded-full border ${statusColor[s.status]}`}>
                {s.status}
              </span>
            </div>
            <div className="text-2xl font-bold mt-2">{s.attendance_percent}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}