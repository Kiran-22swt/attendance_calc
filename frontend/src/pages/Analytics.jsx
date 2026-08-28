import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { getDashboard } from "../lib/api.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Analytics() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    getDashboard().then((data) => setSubjects(data.subjects));
  }, []);

  if (subjects.length === 0) return <p className="text-gray-500">No data yet.</p>;

  const sorted = [...subjects].sort((a, b) => a.attendance_percent - b.attendance_percent);

  const chartData = {
    labels: sorted.map((s) => s.name),
    datasets: [
      {
        label: "Attendance %",
        data: sorted.map((s) => s.attendance_percent),
        backgroundColor: sorted.map((s) =>
          s.status === "danger" ? "#ef4444" : s.status === "warning" ? "#eab308" : "#22c55e"
        ),
      },
    ],
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Analytics</h2>
      <div className="max-w-2xl">
        <Bar data={chartData} options={{ scales: { y: { min: 0, max: 100 } } }} />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 max-w-xl">
        <div>
          <h3 className="font-semibold mb-2">Needs recovery</h3>
          <ul className="text-sm">
            {sorted.filter((s) => s.recovery_classes > 0).map((s) => (
              <li key={s.id}>{s.name}: {s.recovery_classes} classes</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Most safe bunks</h3>
          <ul className="text-sm">
            {[...subjects].sort((a, b) => b.safe_bunks - a.safe_bunks).slice(0, 5).map((s) => (
              <li key={s.id}>{s.name}: {s.safe_bunks}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}