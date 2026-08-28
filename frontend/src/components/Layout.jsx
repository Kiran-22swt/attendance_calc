import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, PlusCircle, CalendarCheck, BarChart3, Settings as SettingsIcon, Calculator, Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "../hooks/useTheme.js";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/attendance", label: "Mark Attendance", icon: CalendarCheck },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/calculator", label: "Calculator", icon: Calculator },
  { to: "/add-subject", label: "Add Subject", icon: PlusCircle },
  { to: "/settings", label: "Settings", icon: SettingsIcon },
];

const themeOptions = [
  { value: "light", icon: Sun },
  { value: "dark", icon: Moon },
  { value: "system", icon: Monitor },
];

export default function Layout() {
  const [theme, setTheme] = useTheme();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <aside className="w-56 shrink-0 border-r border-gray-200 dark:border-gray-800 p-4 flex flex-col">
        <h1 className="text-lg font-bold mb-6">Can I Skip This Period?</h1>

        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto flex gap-1 pt-4 border-t border-gray-200 dark:border-gray-800">
          {themeOptions.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={`p-2 rounded-lg transition-colors ${
                theme === value
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              title={value}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}