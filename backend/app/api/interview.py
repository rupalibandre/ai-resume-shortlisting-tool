from datetime import date, time

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)


class InterviewRequest(BaseModel):

    interview_date: date
    interview_time: time
    interview_mode: str
    interviewer_name: str


@router.put("/{candidate_id}")
def schedule_interview(
    candidate_id: int,
    request: InterviewRequest,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    candidate.interview_date = request.interview_date
    candidate.interview_time = request.interview_time
    candidate.interview_mode = request.interview_mode
    candidate.interviewer_name = request.interviewer_name

    candidate.status = "Interview"

    db.commit()
    db.refresh(candidate)

    return {
        "message": "Interview Scheduled Successfully",
        "candidate": {
            "id": candidate.id,
            "name": candidate.name,
            "interview_date": candidate.interview_date,
            "interview_time": candidate.interview_time,
            "interview_mode": candidate.interview_mode,
            "interviewer_name": candidate.interviewer_name,
            "status": candidate.status,
        },
    }


@router.get("/{candidate_id}")
def get_interview(
    candidate_id: int,
    db: Session = Depends(get_db),
):

    candidate = (
        db.query(Candidate)
        .filter(Candidate.id == candidate_id)
        .first()
    )

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidate not found",
        )

    return {
        "candidate": {
            "id": candidate.id,
            "name": candidate.name,
            "interview_date": candidate.interview_date,
            "interview_time": candidate.interview_time,
            "interview_mode": candidate.interview_mode,
            "interviewer_name": candidate.interviewer_name,
            "status": candidate.status,
        }
    }