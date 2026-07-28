from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session
from sqlalchemy import func

from io import BytesIO
from openpyxl import Workbook

from app.database.connection import get_db
from app.models.job import Job
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


@router.get("/")
def reports(db: Session = Depends(get_db)):

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
        db.query(
            func.avg(Candidate.match_percentage)
        ).scalar()
    )

    return {
        "total_jobs": total_jobs,
        "total_candidates": total_candidates,
        "shortlisted": shortlisted,
        "rejected": rejected,
        "pending": pending,
        "average_match": round(
            average_match or 0,
            2,
        ),
    }


@router.get("/excel")
def export_excel(db: Session = Depends(get_db)):

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

    candidates = db.query(Candidate).all()

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

    return StreamingResponse(
        stream,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={
            "Content-Disposition":
            "attachment; filename=Candidates_Report.xlsx"
        },
    )