from datetime import date as date_type
from pydantic import BaseModel, ConfigDict

class AttendanceMark(BaseModel):
    subject_id: int
    date: date_type
    period_number: int
    present: bool

class AttendanceLogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    subject_id: int
    date: date_type
    period_number: int
    present: bool

class SkipPreview(BaseModel):
    subject_id: int
    current_percent: float
    percent_if_present: float
    percent_if_absent: float
    safe_bunks_remaining: int

# schemas/attendance.py — add:
class BulkAttendanceMark(BaseModel):
    date: date_type
    marks: list[AttendanceMark]

# schemas/attendance.py — add:
class BulkAttendanceMark(BaseModel):
    date: date_type
    marks: list[AttendanceMark]
