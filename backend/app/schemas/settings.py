from pydantic import BaseModel, ConfigDict

class SettingsUpdate(BaseModel):
    semester_name: str | None = None
    required_attendance_percent: float | None = None
    notifications_enabled: bool | None = None
    theme: str | None = None

class SettingsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    semester_name: str
    required_attendance_percent: float
    notifications_enabled: bool
    theme: str