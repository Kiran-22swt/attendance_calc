from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import secrets
from app.database import get_db
from app.models.share_link import ShareLink
from app.models.subject import Subject
from app.services import attendance_calc

router = APIRouter()

@router.post("/")
def create_share_link(db: Session = Depends(get_db)):
    token = secrets.token_urlsafe(12)
    link = ShareLink(token=token)
    db.add(link)
    db.commit()
    db.refresh(link)
    return {"token": token, "url": f"/share/{token}"}

@router.get("/{token}")
def view_shared(token: str, db: Session = Depends(get_db)):
    link = db.query(ShareLink).filter(ShareLink.token == token).first()
    if not link:
        raise HTTPException(status_code=404, detail="Invalid or expired link")
    subjects = db.query(Subject).all()
    cards = []
    for s in subjects:
        pct = attendance_calc.attendance_percent(s.attended_classes, s.total_classes)
        cards.append({
            "name": s.name,
            "attendance_percent": pct,
            "status": attendance_calc.status(pct, s.required_percent),
        })
    return {"subjects": cards}