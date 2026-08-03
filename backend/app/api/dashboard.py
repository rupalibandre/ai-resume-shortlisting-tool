from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date

from app.database.connection import get_db

from app.models.job import Job
from app.models.candidate import Candidate
from app.models.activity import Activity
from app.models.interview import Interview

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/")
def dashboard(db: Session = Depends(get_db)):

    total_jobs = db.query(Job).count()

    total_candidates = db.query(Candidate).count()

    active_jobs = (
        db.query(Job)
        .filter(Job.status == "Open")
        .count()
    )

    closed_jobs = (
        db.query(Job)
        .filter(Job.status == "Closed")
        .count()
    )

    # SAFE: priority field exists or not
    if hasattr(Job, "priority"):
        high_priority_jobs = (
            db.query(Job)
            .filter(Job.priority == "High")
            .count()
        )
    else:
        high_priority_jobs = 0

    # SAFE: vacancies field exists or not
    if hasattr(Job, "vacancies"):
        total_vacancies = (
            db.query(
                func.sum(Job.vacancies)
            ).scalar()
            or 0
        )
    else:
        total_vacancies = 0

    shortlisted = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Shortlisted"
        )
        .count()
    )

    interview = (
        db.query(Candidate)
        .filter(
            Candidate.status ==
            "Interview Scheduled"
        )
        .count()
    )

    pending = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Pending"
        )
        .count()
    )

    rejected = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Rejected"
        )
        .count()
    )

    selected = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Selected"
        )
        .count()
    )

    average_match = (
        db.query(
            func.avg(
                Candidate.match_percentage
            )
        ).scalar()
        or 0
    )

    highest_match = (
        db.query(
            func.max(
                Candidate.match_percentage
            )
        ).scalar()
        or 0
    )

    lowest_match = (
        db.query(
            func.min(
                Candidate.match_percentage
            )
        ).scalar()
        or 0
    )

    # EXPERIENCE is varchar -> do NOT use AVG()
    avg_experience = "N/A"

    latest_candidates = (
        db.query(Candidate)
        .order_by(
            Candidate.id.desc()
        )
        .limit(5)
        .all()
    )

    top_candidates = (
        db.query(Candidate)
        .order_by(
            Candidate.match_percentage.desc()
        )
        .limit(5)
        .all()
    )

    activities = (
        db.query(Activity)
        .order_by(
            Activity.created_at.desc()
        )
        .limit(10)
        .all()
    )

    interviews = (
        db.query(Interview)
        .filter(
            Interview.interview_date >=
            date.today()
        )
        .order_by(
            Interview.interview_date.asc()
        )
        .limit(10)
        .all()
    )
        # ==========================
    # Hiring Chart
    # ==========================

    hiring_chart = [
        {
            "label": "0-20",
            "count": db.query(Candidate).filter(Candidate.match_percentage < 20).count(),
        },
        {
            "label": "20-40",
            "count": db.query(Candidate).filter(
                Candidate.match_percentage >= 20,
                Candidate.match_percentage < 40,
            ).count(),
        },
        {
            "label": "40-60",
            "count": db.query(Candidate).filter(
                Candidate.match_percentage >= 40,
                Candidate.match_percentage < 60,
            ).count(),
        },
        {
            "label": "60-80",
            "count": db.query(Candidate).filter(
                Candidate.match_percentage >= 60,
                Candidate.match_percentage < 80,
            ).count(),
        },
        {
            "label": "80-100",
            "count": db.query(Candidate).filter(
                Candidate.match_percentage >= 80
            ).count(),
        },
    ]

    # ==========================
    # Status Chart
    # ==========================

    status_chart = [
        {"label": "Pending", "count": pending},
        {"label": "Interview", "count": interview},
        {"label": "Shortlisted", "count": shortlisted},
        {"label": "Rejected", "count": rejected},
        {"label": "Selected", "count": selected},
    ]

    # ==========================
    # Monthly Hiring
    # ==========================

    monthly_hiring = [
        {"month": "Jan", "count": 8},
        {"month": "Feb", "count": 12},
        {"month": "Mar", "count": 16},
        {"month": "Apr", "count": 18},
        {"month": "May", "count": 22},
        {"month": "Jun", "count": 25},
    ]

    # ==========================
    # AI Insights
    # ==========================

    ai_insights = {
        "average_match": round(average_match, 2),
        "highest_match": highest_match,
        "lowest_match": lowest_match,
        "average_experience": avg_experience,
        "recommendation": "Candidates above 80% should be interviewed immediately.",
    }

    # ==========================
    # Job Analytics
    # ==========================

    job_analytics = {
        "active_jobs": active_jobs,
        "closed_jobs": closed_jobs,
        "high_priority_jobs": high_priority_jobs,
        "vacancies": total_vacancies,
    }
        # ==========================
    # Final Response
    # ==========================

    return {

        "statistics": {

            "total_jobs": total_jobs,
            "total_candidates": total_candidates,
            "pending": pending,
            "shortlisted": shortlisted,
            "interview": interview,
            "selected": selected,
            "rejected": rejected,
            "average_match": round(average_match, 2),
            "highest_match": highest_match,
            "lowest_match": lowest_match,

        },

        "job_analytics": job_analytics,

        "ai_insights": ai_insights,

        "recent_candidates": [

            {

                "id": c.id,
                "name": c.name,
                "job": c.job_title,
                "company": c.company,
                "score": c.match_percentage,
                "status": c.status,
                "resume": c.filename,

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

        "activities": [

    {

        "id": a.id,

        "icon": "📄",

        "title": a.title,

        "description": a.description,

        "created_at": a.created_at,

    }

    for a in activities

],

        "upcoming_interviews": [

            {

                "id": i.id,
                "candidate": i.candidate_name,
                "job": i.job_title,
                "date": str(i.interview_date),
                "time": str(i.interview_time),
                "interviewer": i.interviewer,
                "mode": getattr(i, "mode", "Offline"),
                "status": i.status,

            }

            for i in interviews

        ],

        "monthly_hiring": monthly_hiring,

        "chart": hiring_chart,

        "status_chart": status_chart,

    }