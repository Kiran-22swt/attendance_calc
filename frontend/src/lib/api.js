import axios from "axios";

const api = axios.create({
  baseURL: "/api",
});

export const getDashboard = () => api.get("/dashboard/").then(r => r.data);
export const getToday = () => api.get("/dashboard/today").then(r => r.data);

export const getSubjects = () => api.get("/subjects/").then(r => r.data);
export const createSubject = (data) => api.post("/subjects/", data).then(r => r.data);
export const updateSubject = (id, data) => api.put(`/subjects/${id}`, data).then(r => r.data);
export const deleteSubject = (id) => api.delete(`/subjects/${id}`).then(r => r.data);

export const getTimetable = (dayOfWeek) =>
  api.get("/timetable/", { params: dayOfWeek != null ? { day_of_week: dayOfWeek } : {} }).then(r => r.data);
export const createTimetableEntry = (data) => api.post("/timetable/", data).then(r => r.data);
export const deleteTimetableEntry = (id) => api.delete(`/timetable/${id}`).then(r => r.data);

export const markAttendance = (data) => api.post("/attendance/", data).then(r => r.data);
export const getSkipPreview = (subjectId) => api.get(`/attendance/preview/${subjectId}`).then(r => r.data);

export const getSettings = () => api.get("/settings/").then(r => r.data);
export const updateSettings = (data) => api.put("/settings/", data).then(r => r.data);

export const createShareLink = () => api.post("/share/").then(r => r.data);
export const getSharedView = (token) => api.get(`/share/${token}`).then(r => r.data);

export const getSubject = (id) => api.get(`/subjects/${id}`).then(r => r.data);
export default api;
