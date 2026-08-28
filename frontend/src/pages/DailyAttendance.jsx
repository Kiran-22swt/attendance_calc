import { useEffect, useState } from "react";
import { getToday, markAttendance } from "../lib/api.js";

export default function DailyAttendance() {
  const [periods, setPeriods] = useState([]);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().slice(0, 10);

  const load = () => {
    setLoading(true);
    getToday().then((data) => setPeriods(data.periods)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const mark = async (subjectId, periodNumber, present) => {
    await markAttendance({ subject_id: subjectId, date: today, period_number: periodNumber, present });
    load();
  };

  const bulkMark = async (present) => {
  await api.post("/attendance/bulk", {
    date: today,
    marks: periods.map(p => ({ subject_id: p.subject_id, date: today, period_number: p.period_number, present })),
  });
  load();
};

  if (loading) return <p>Loading...</p>;
  if (periods.length === 0) return <p className="text-gray-500">No periods scheduled today.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Today's Periods</h2>
        <div className="flex gap-2">
          <button onClick={() => bulkMark(true)} className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-sm">Mark all present</button>
          <button onClick={() => bulkMark(false)} className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-sm">Mark all absent</button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-500 border-b">
            <th className="py-2">Period</th>
            <th>Subject</th>
            <th>Attendance %</th>
            <th>Status</th>
            <th>Mark</th>
          </tr>
        </thead>
        <tbody>
          {periods.map((p) => (
            <tr key={`${p.subject_id}-${p.period_number}`} className="border-b">
              <td className="py-2">{p.period_number}</td>
              <td>{p.subject_name}</td>
              <td>{p.attendance_percent}%</td>
              <td>{p.status}</td>
              <td className="flex gap-2 py-2">
                <button onClick={() => mark(p.subject_id, p.period_number, true)} className="px-2 py-1 bg-green-100 text-green-700 rounded">Present</button>
                <button onClick={() => mark(p.subject_id, p.period_number, false)} className="px-2 py-1 bg-red-100 text-red-700 rounded">Absent</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}