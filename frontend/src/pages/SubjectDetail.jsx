import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSubjects, getSkipPreview } from "../lib/api.js";

export default function SubjectDetail() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    getSubject(id).then(setSubject);
    getSkipPreview(id).then(setPreview);
  }, [id]);

  if (!subject) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold">{subject.name}</h2>
      <p className="text-gray-500">{subject.faculty_name}</p>

      <div className="mt-4 grid grid-cols-2 gap-4 max-w-md">
        <Stat label="Total classes" value={subject.total_classes} />
        <Stat label="Attended" value={subject.attended_classes} />
        <Stat label="Missed" value={subject.total_classes - subject.attended_classes} />
        <Stat label="Required %" value={`${subject.required_percent}%`} />
      </div>

      {preview && (
        <div className="mt-6 p-4 border rounded-xl">
          <h3 className="font-semibold mb-2">If next period...</h3>
          <p>Present: {preview.percent_if_present}%</p>
          <p>Absent: {preview.percent_if_absent}%</p>
          <p>Safe bunks left: {preview.safe_bunks_remaining}</p>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
}