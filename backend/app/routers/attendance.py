from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.subject import Subject
from app.models.attendance_log import AttendanceLog
from app.schemas.attendance import AttendanceMark, AttendanceLogOut, SkipPreview
from app.services import attendance_calc

router = APIRouter()

@router.post("/", response_model=AttendanceLogOut)
def mark_attendance(payload: AttendanceMark, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    existing = db.query(AttendanceLog).filter(
        AttendanceLog.subject_id == payload.subject_id,
        AttendanceLog.date == payload.date,
        AttendanceLog.period_number == payload.period_number,
    ).first()

    if existing:
        # undo previous count, then apply new
        subject.total_classes -= 1
        if existing.present:
            subject.attended_classes -= 1
        existing.present = payload.present
    else:
        log = AttendanceLog(**payload.model_dump())
        db.add(log)
        existing = log

    subject.total_classes += 1
    if payload.present:
        subject.attended_classes += 1

    db.commit()
    db.refresh(existing)
    return existing

@router.get("/preview/{subject_id}", response_model=SkipPreview)
def preview_skip(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    result = attendance_calc.skip_preview(
        subject.attended_classes, subject.total_classes, subject.required_percent
    )
    result["subject_id"] = subject_id
    return result

# routers/attendance.py — add:
@router.post("/bulk")
def bulk_mark(payload: BulkAttendanceMark, db: Session = Depends(get_db)):
    results = []
    for m in payload.marks:
        results.append(mark_attendance(m, db))
    return {"marked": len(results)}