from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta
from app.database import get_db
from app.models.subject import Subject
from app.models.timetable import TimetableEntry
from app.services import attendance_calc

router = APIRouter()

@router.get("/")
def get_dashboard(db: Session = Depends(get_db)):
    subjects = db.query(Subject).all()
    cards = []
    for s in subjects:
        pct = attendance_calc.attendance_percent(s.attended_classes, s.total_classes)
        cards.append({
            "id": s.id,
            "name": s.name,
            "faculty_name": s.faculty_name,
            "color": s.color,
            "icon": s.icon,
            "attendance_percent": pct,
            "total_classes": s.total_classes,
            "attended_classes": s.attended_classes,
            "safe_bunks": attendance_calc.safe_bunks(s.attended_classes, s.total_classes, s.required_percent),
            "recovery_classes": attendance_calc.classes_needed_to_recover(s.attended_classes, s.total_classes, s.required_percent),
            "status": attendance_calc.status(pct, s.required_percent),
        })
    return {"subjects": cards}

@router.get("/today")
def get_today(db: Session = Depends(get_db)):
    today_dow = date.today().weekday()  # 0=Monday
    entries = db.query(TimetableEntry).filter(TimetableEntry.day_of_week == today_dow).order_by(TimetableEntry.period_number).all()
    result = []
    for e in entries:
        s = e.subject
        pct = attendance_calc.attendance_percent(s.attended_classes, s.total_classes)
        result.append({
            "period_number": e.period_number,
            "subject_id": s.id,
            "subject_name": s.name,
            "attendance_percent": pct,
            "status": attendance_calc.status(pct, s.required_percent),
        })
    return {"date": str(date.today()), "periods": result}