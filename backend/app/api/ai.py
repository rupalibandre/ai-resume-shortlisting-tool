from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.schemas.ai import AIMatchRequest
from app.services.groq_service import ai_resume_match

router = APIRouter(
    prefix="/ai",
    tags=["AI Matching"],
)


@router.post("/match")
def match_resume(
    request: AIMatchRequest,
    db: Session = Depends(get_db),
):

    job = (
        db.query(Job)
        .filter(Job.id == request.job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    result = ai_resume_match(
        request.resume_text,
        job.description,
    )

    return {
        "job": {
            "id": job.id,
            "title": job.title,
            "company": job.company,
        },
        "ai_result": result,
    }