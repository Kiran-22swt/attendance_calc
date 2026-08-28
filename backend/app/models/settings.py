from sqlalchemy import Column, Integer, String, Float, Boolean
from app.database import Base

class AppSettings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)
    semester_name = Column(String, default="Current Semester")
    required_attendance_percent = Column(Float, default=75.0)
    notifications_enabled = Column(Boolean, default=True)
    theme = Column(String, default="system")  # "light" | "dark" | "system"