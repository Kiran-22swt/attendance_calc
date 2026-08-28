import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import SubjectDetail from "./pages/SubjectDetail.jsx";
import AddSubject from "./pages/AddSubject.jsx";
import DailyAttendance from "./pages/DailyAttendance.jsx";
import Analytics from "./pages/Analytics.jsx";
import Settings from "./pages/Settings.jsx";
import Calculator from "./pages/Calculator.jsx";
import SharedView from "./pages/SharedView.jsx";
import Layout from "./components/Layout.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/subject/:id" element={<SubjectDetail />} />
        <Route path="/add-subject" element={<AddSubject />} />
        <Route path="/attendance" element={<DailyAttendance />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/calculator" element={<Calculator />} />
      </Route>
      <Route path="/share/:token" element={<SharedView />} />
    </Routes>
  );
}