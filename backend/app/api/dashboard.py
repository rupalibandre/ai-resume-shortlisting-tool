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
def dashboard(db: Session = Depends(get_db)):

    total_jobs = db.query(Job).count()

    total_candidates = db.query(Candidate).count()

    shortlisted = (
        db.query(Candidate)
        .filter(Candidate.status == "Shortlisted")
        .count()
    )

    interview = (
        db.query(Candidate)
        .filter(Candidate.status == "Interview Scheduled")
        .count()
    )

    pending = (
        db.query(Candidate)
        .filter(Candidate.status == "Pending")
        .count()
    )

    rejected = (
        db.query(Candidate)
        .filter(Candidate.status == "Rejected")
        .count()
    )

    selected = (
        db.query(Candidate)
        .filter(Candidate.status == "Selected")
        .count()
    )

    average_match = (
        db.query(
            func.avg(Candidate.match_percentage)
        ).scalar()
    )

    latest_candidates = (
        db.query(Candidate)
        .order_by(Candidate.id.desc())
        .limit(5)
        .all()
    )

    top_candidates = (
        db.query(Candidate)
        .order_by(Candidate.match_percentage.desc())
        .limit(5)
        .all()
    )

    hiring_chart = [
        {
            "label": "0-20",
            "count": db.query(Candidate)
            .filter(Candidate.match_percentage < 20)
            .count(),
        },
        {
            "label": "20-40",
            "count": db.query(Candidate)
            .filter(
                Candidate.match_percentage >= 20,
                Candidate.match_percentage < 40,
            )
            .count(),
        },
        {
            "label": "40-60",
            "count": db.query(Candidate)
            .filter(
                Candidate.match_percentage >= 40,
                Candidate.match_percentage < 60,
            )
            .count(),
        },
        {
            "label": "60-80",
            "count": db.query(Candidate)
            .filter(
                Candidate.match_percentage >= 60,
                Candidate.match_percentage < 80,
            )
            .count(),
        },
        {
            "label": "80-100",
            "count": db.query(Candidate)
            .filter(Candidate.match_percentage >= 80)
            .count(),
        },
    ]

    status_chart = [
        {
            "label": "Pending",
            "count": pending,
        },
        {
            "label": "Interview",
            "count": interview,
        },
        {
            "label": "Shortlisted",
            "count": shortlisted,
        },
        {
            "label": "Rejected",
            "count": rejected,
        },
        {
            "label": "Selected",
            "count": selected,
        },
    ]

    return {

        "statistics": {

            "total_jobs": total_jobs,
            "total_candidates": total_candidates,
            "shortlisted": shortlisted,
            "interview": interview,
            "pending": pending,
            "rejected": rejected,
            "selected": selected,
            "average_match": round(
                average_match or 0,
                2,
            ),
        },

        "recent_candidates": [

            {
                "id": c.id,
                "name": c.name,
                "job": c.job_title,
                "company": c.company,
                "score": c.match_percentage,
                "status": c.status,
                "filename": c.filename,
            }

            for c in latest_candidates

        ],

        "top_candidates": [

            {
                "id": c.id,
                "name": c.name,
                "job": c.job_title,
                "company": c.company,
                "score": c.match_percentage,
                "status": c.status,
            }

            for c in top_candidates

        ],

        "chart": hiring_chart,

        "status_chart": status_chart,

    }