import { Link } from "react-router-dom";

const statusColor = {
  safe: "bg-green-100 text-green-700 border-green-300",
  warning: "bg-yellow-100 text-yellow-700 border-yellow-300",
  danger: "bg-red-100 text-red-700 border-red-300",
};

export default function SubjectCard({ subject }) {
  return (
    <Link
      to={`/subject/${subject.id}`}
      className="block rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-md transition-shadow"
      style={{ borderLeft: `4px solid ${subject.color}` }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{subject.name}</h3>
          <p className="text-sm text-gray-500">{subject.faculty_name}</p>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full border ${statusColor[subject.status]}`}>
          {subject.status}
        </span>
      </div>
      <div className="mt-3 text-2xl font-bold">{subject.attendance_percent}%</div>
      <div className="mt-2 text-sm text-gray-500 flex justify-between">
        <span>Safe bunks: {subject.safe_bunks}</span>
        {subject.recovery_classes > 0 && <span>Recover: {subject.recovery_classes}</span>}
      </div>
    </Link>
  );
}