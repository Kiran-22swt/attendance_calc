from pydantic import BaseModel, ConfigDict

class SubjectBase(BaseModel):
    name: str
    faculty_name: str | None = None
    required_percent: float = 75.0
    color: str = "#3b82f6"
    icon: str = "book"

class SubjectCreate(SubjectBase):
    total_classes: int = 0
    attended_classes: int = 0

class SubjectUpdate(BaseModel):
    name: str | None = None
    faculty_name: str | None = None
    required_percent: float | None = None
    color: str | None = None
    icon: str | None = None

class SubjectOut(SubjectBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    total_classes: int
    attended_classes: int