from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.connection import get_db
from app.models.job import Job
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard_stats(
    db: Session = Depends(get_db),
):

    total_jobs = db.query(Job).count()

    total_candidates = db.query(Candidate).count()

    shortlisted = (
        db.query(Candidate)
        .filter(Candidate.status == "Shortlisted")
        .count()
    )

    rejected = (
        db.query(Candidate)
        .filter(Candidate.status == "Rejected")
        .count()
    )

    pending = (
        db.query(Candidate)
        .filter(Candidate.status == "Pending")
        .count()
    )

    average_match = (
        db.query(func.avg(Candidate.match_percentage))
        .scalar()
    )

    recent_candidates = (
        db.query(Candidate)
        .order_by(Candidate.id.desc())
        .limit(5)
        .all()
    )

    return {
        "total_jobs": total_jobs,
        "total_candidates": total_candidates,
        "shortlisted": shortlisted,
        "rejected": rejected,
        "pending": pending,
        "average_match": round(average_match or 0, 2),
        "recent_candidates": recent_candidates,
    }