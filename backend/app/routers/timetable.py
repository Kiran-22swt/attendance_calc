from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.timetable import TimetableEntry
from app.models.subject import Subject
from app.schemas.timetable import TimetableEntryCreate, TimetableEntryOut

router = APIRouter()

@router.get("/", response_model=list[TimetableEntryOut])
def list_timetable(day_of_week: int | None = None, db: Session = Depends(get_db)):
    query = db.query(TimetableEntry)
    if day_of_week is not None:
        query = query.filter(TimetableEntry.day_of_week == day_of_week)
    return query.order_by(TimetableEntry.day_of_week, TimetableEntry.period_number).all()

@router.post("/", response_model=TimetableEntryOut)
def create_entry(payload: TimetableEntryCreate, db: Session = Depends(get_db)):
    subject = db.query(Subject).filter(Subject.id == payload.subject_id).first()
    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")
    clash = db.query(TimetableEntry).filter(
        TimetableEntry.day_of_week == payload.day_of_week,
        TimetableEntry.period_number == payload.period_number,
    ).first()
    if clash:
        raise HTTPException(status_code=400, detail="Period already occupied that day")
    entry = TimetableEntry(**payload.model_dump())
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

@router.delete("/{entry_id}")
def delete_entry(entry_id: int, db: Session = Depends(get_db)):
    entry = db.query(TimetableEntry).filter(TimetableEntry.id == entry_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Entry not found")
    db.delete(entry)
    db.commit()
    return {"deleted": True}