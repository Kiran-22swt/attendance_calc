import { useState } from "react";

export default function Calculator() {
  const [attended, setAttended] = useState(0);
  const [total, setTotal] = useState(0);
  const [required, setRequired] = useState(75);

  const percent = total > 0 ? ((attended / total) * 100).toFixed(2) : "0.00";

  let safeBunks = 0;
  if (required > 0 && required < 100) {
    safeBunks = Math.max(0, Math.floor(attended / (required / 100) - total));
  }

  let recovery = 0;
  const reqDecimal = required / 100;
  if (reqDecimal < 1) {
    const numerator = reqDecimal * total - attended;
    const denominator = 1 - reqDecimal;
    if (numerator > 0) recovery = Math.ceil(numerator / denominator);
  }

  return (
    <div className="max-w-md flex flex-col gap-3">
      <h2 className="text-xl font-bold">Attendance Calculator</h2>
      <label className="flex flex-col gap-1">
        Attended
        <input type="number" className="border p-2 rounded-lg" value={attended} onChange={(e) => setAttended(Number(e.target.value))} />
      </label>
      <label className="flex flex-col gap-1">
        Total
        <input type="number" className="border p-2 rounded-lg" value={total} onChange={(e) => setTotal(Number(e.target.value))} />
      </label>
      <label className="flex flex-col gap-1">
        Required %
        <input type="number" className="border p-2 rounded-lg" value={required} onChange={(e) => setRequired(Number(e.target.value))} />
      </label>

      <div className="mt-4 p-4 border rounded-xl">
        <p>Current %: <strong>{percent}%</strong></p>
        <p>Safe bunks: <strong>{safeBunks}</strong></p>
        <p>Classes needed to recover: <strong>{recovery}</strong></p>
      </div>
    </div>
  );
}