from pydantic import BaseModel, ConfigDict, field_validator

class TimetableEntryBase(BaseModel):
    subject_id: int
    day_of_week: int  # 0=Monday ... 6=Sunday
    period_number: int

    @field_validator("day_of_week")
    @classmethod
    def check_day(cls, v):
        if not 0 <= v <= 6:
            raise ValueError("day_of_week must be 0-6")
        return v

    @field_validator("period_number")
    @classmethod
    def check_period(cls, v):
        if v < 1:
            raise ValueError("period_number must be >= 1")
        return v

class TimetableEntryCreate(TimetableEntryBase):
    pass

class TimetableEntryOut(TimetableEntryBase):
    model_config = ConfigDict(from_attributes=True)
    id: int