from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database import Base

class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    faculty_name = Column(String, nullable=True)
    required_percent = Column(Float, default=75.0)
    total_classes = Column(Integer, default=0)
    attended_classes = Column(Integer, default=0)
    color = Column(String, default="#3b82f6")
    icon = Column(String, default="book")

    timetable_entries = relationship("TimetableEntry", back_populates="subject", cascade="all, delete-orphan")
    attendance_logs = relationship("AttendanceLog", back_populates="subject", cascade="all, delete-orphan")