from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import subjects, timetable, attendance, dashboard, settings as settings_router, share

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Can I Skip This Period?")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(subjects.router, prefix="/subjects", tags=["subjects"])
app.include_router(timetable.router, prefix="/timetable", tags=["timetable"])
app.include_router(attendance.router, prefix="/attendance", tags=["attendance"])
app.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
app.include_router(settings_router.router, prefix="/settings", tags=["settings"])
app.include_router(share.router, prefix="/share", tags=["share"])

@app.get("/")
def root():
    return {"status": "ok", "app": "Can I Skip This Period?"}