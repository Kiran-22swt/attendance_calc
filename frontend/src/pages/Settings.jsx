import { useEffect, useState } from "react";
import { getSettings, updateSettings, createShareLink } from "../lib/api.js";

export default function Settings() {
  const [settings, setSettings] = useState(null);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const save = async (field, value) => {
    const updated = await updateSettings({ [field]: value });
    setSettings(updated);
  };

  const handleShare = async () => {
    const res = await createShareLink();
    setShareUrl(window.location.origin + res.url);
  };

  if (!settings) return <p>Loading...</p>;

  return (
    <div className="max-w-md flex flex-col gap-4">
      <h2 className="text-xl font-bold">Settings</h2>

      <label className="flex flex-col gap-1">
        Semester name
        <input
          className="border p-2 rounded-lg"
          value={settings.semester_name}
          onChange={(e) => save("semester_name", e.target.value)}
        />
      </label>

      <label className="flex flex-col gap-1">
        Required attendance %
        <input
          type="number"
          className="border p-2 rounded-lg"
          value={settings.required_attendance_percent}
          onChange={(e) => save("required_attendance_percent", Number(e.target.value))}
        />
      </label>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={settings.notifications_enabled}
          onChange={(e) => save("notifications_enabled", e.target.checked)}
        />
        Enable notifications
      </label>

      <label className="flex flex-col gap-1">
        Theme
        <select
          className="border p-2 rounded-lg"
          value={settings.theme}
          onChange={(e) => save("theme", e.target.value)}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="system">System</option>
        </select>
      </label>

      <div className="pt-4 border-t">
        <button onClick={handleShare} className="bg-blue-600 text-white rounded-lg px-4 py-2">
          Generate share link
        </button>
        {shareUrl && <p className="text-sm mt-2 break-all">{shareUrl}</p>}
      </div>
    </div>
  );
}