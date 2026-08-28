from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "sqlite:///./attendance.db"
    required_attendance_percent: float = 75.0

    class Config:
        env_file = ".env"

settings = Settings()