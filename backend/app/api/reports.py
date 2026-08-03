from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func
from io import BytesIO
from openpyxl import Workbook
from datetime import datetime

from app.database.connection import get_db

from app.models.job import Job
from app.models.candidate import Candidate
from app.models.interview import Interview

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
):

    # ===========================
    # Statistics
    # ===========================

    total_jobs = db.query(Job).count()

    total_candidates = db.query(Candidate).count()

    shortlisted = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Shortlisted"
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

    pending = (
        db.query(Candidate)
        .filter(
            Candidate.status == "Pending"
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
    ) or 0

    statistics = {

        "total_jobs": total_jobs,

        "total_candidates": total_candidates,

        "shortlisted": shortlisted,

        "rejected": rejected,

        "pending": pending,

        "selected": selected,

        "average_match": round(
            average_match,
            2,
        ),

    }

    # ===========================
    # Hiring Chart
    # ===========================

    chart = [

        {
            "label": "Jobs",
            "count": total_jobs,
        },

        {
            "label": "Candidates",
            "count": total_candidates,
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
            "label": "Pending",
            "count": pending,
        },

        {
            "label": "Selected",
            "count": selected,
        },

    ]

    # ===========================
    # Pie Chart
    # ===========================

    status_chart = [

        {
            "label": "Shortlisted",
            "count": shortlisted,
        },

        {
            "label": "Rejected",
            "count": rejected,
        },

        {
            "label": "Pending",
            "count": pending,
        },

        {
            "label": "Selected",
            "count": selected,
        },

    ]

    # ===========================
    # AI Insights
    # ===========================

    highest_match = (
        db.query(
            func.max(
                Candidate.match_percentage
            )
        ).scalar()
    ) or 0

    lowest_match = (
        db.query(
            func.min(
                Candidate.match_percentage
            )
        ).scalar()
    ) or 0

    experience_list = []

    candidates = db.query(
        Candidate
    ).all()

    for candidate in candidates:

        try:

            value = (
                candidate.experience
                .replace(
                    "Years",
                    "",
                )
                .replace(
                    "Year",
                    "",
                )
                .strip()
            )

            experience_list.append(
                float(value)
            )

        except:

            pass

    if len(experience_list) > 0:

        average_experience = round(
            sum(experience_list)
            / len(experience_list),
            1,
        )

    else:

        average_experience = 0
            # ===========================
    # Recommendation
    # ===========================

    if average_match >= 80:
        recommendation = (
            "Excellent hiring pipeline. Continue current recruitment strategy."
        )

    elif average_match >= 60:
        recommendation = (
            "Candidate quality is good. Increase shortlisting accuracy using AI."
        )

    else:
        recommendation = (
            "Low matching candidates detected. Improve job descriptions and required skills."
        )

    ai_insights = {
        "highest_match": round(highest_match, 2),
        "lowest_match": round(lowest_match, 2),
        "average_experience": average_experience,
        "recommendation": recommendation,
    }

    # ===========================
    # Job Analytics
    # ===========================

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

    high_priority_jobs = (
        db.query(Job)
        .filter(Job.priority == "High")
        .count()
    )

    vacancies = (
        db.query(
            func.sum(Job.vacancies)
        ).scalar()
    ) or 0

    job_analytics = {
        "active_jobs": active_jobs,
        "closed_jobs": closed_jobs,
        "high_priority_jobs": high_priority_jobs,
        "vacancies": vacancies,
    }

    # ===========================
    # Interview Analytics
    # ===========================

    total_interviews = db.query(
        Interview
    ).count()

    scheduled = (
        db.query(Interview)
        .filter(
            Interview.status == "Scheduled"
        )
        .count()
    )

    completed = (
        db.query(Interview)
        .filter(
            Interview.status == "Completed"
        )
        .count()
    )

    cancelled = (
        db.query(Interview)
        .filter(
            Interview.status == "Cancelled"
        )
        .count()
    )

    interview_analytics = {
        "total": total_interviews,
        "scheduled": scheduled,
        "completed": completed,
        "cancelled": cancelled,
    }

    # ===========================
    # Recent Activity
    # ===========================

    recent_candidates = (
        db.query(Candidate)
        .order_by(Candidate.id.desc())
        .limit(5)
        .all()
    )

    activity = []

    for candidate in recent_candidates:

        activity.append({
            "candidate": candidate.name,
            "job": candidate.job_title,
            "status": candidate.status,
            "match": candidate.match_percentage,
        })

    return {
        "statistics": statistics,
        "chart": chart,
        "status_chart": status_chart,
        "ai_insights": ai_insights,
        "job_analytics": job_analytics,
        "interview_analytics": interview_analytics,
        "recent_activity": activity,
    }


# ======================================
# Export Excel
# ======================================

@router.get("/excel")
def export_excel(
    db: Session = Depends(get_db),
):

    workbook = Workbook()

    sheet = workbook.active

    sheet.title = "Candidates"

    sheet.append([
        "Name",
        "Job",
        "Company",
        "Match %",
        "Status",
    ])

    candidates = db.query(
        Candidate
    ).all()

    for candidate in candidates:

        sheet.append([
            candidate.name,
            candidate.job_title,
            candidate.company,
            candidate.match_percentage,
            candidate.status,
        ])

    stream = BytesIO()

    workbook.save(stream)

    stream.seek(0)

    filename = (
        f"Recruitment_Report_"
        f"{datetime.now().strftime('%Y%m%d')}.xlsx"
    )

    return StreamingResponse(
        stream,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition":
            f"attachment; filename={filename}"
        },
    )