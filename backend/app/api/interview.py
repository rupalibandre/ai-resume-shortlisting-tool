from datetime import date, time

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.candidate import Candidate

from app.services.email_service import (
    send_interview_email,
    send_shortlisted_email,
    send_rejected_email,
)

router = APIRouter(
    prefix="/interview",
    tags=["Interview"],
)

notifications = []


class InterviewRequest(BaseModel):

    interview_date: date

    interview_time: time

    interview_mode: str

    interviewer_name: str

    interview_round: str

    meeting_link: str = ""

    location: str = ""

    notes: str = ""


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

    candidate.interview_round = request.interview_round

    candidate.meeting_link = request.meeting_link

    candidate.interview_location = request.location

    candidate.interview_notes = request.notes

    candidate.status = "Interview Scheduled"

    db.commit()

    db.refresh(candidate)

    if candidate.email:

        send_interview_email(
            candidate.name,
            candidate.email,
            candidate.company,
            candidate.interview_date,
            candidate.interview_time,
            candidate.interviewer_name,
            candidate.interview_mode,
        )

    notifications.append(
        {
            "title": "Interview Scheduled",
            "message": (
                f"{candidate.name} interview scheduled on "
                f"{candidate.interview_date}"
            ),
        }
    )

    return {
        "message": "Interview Scheduled Successfully",
        "candidate": {
            "id": candidate.id,
            "status": candidate.status,
            "interview_date": candidate.interview_date,
            "interview_time": candidate.interview_time,
            "interview_mode": candidate.interview_mode,
            "interviewer_name": candidate.interviewer_name,
            "interview_round": candidate.interview_round,
            "meeting_link": candidate.meeting_link,
            "location": candidate.interview_location,
            "notes": candidate.interview_notes,
        },
    }
@router.put("/status/{candidate_id}/{status}")
def update_status(
    candidate_id: int,
    status: str,
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

    candidate.status = status

    db.commit()

    db.refresh(candidate)

    if candidate.email:

        if status == "Shortlisted":

            send_shortlisted_email(
                candidate.name,
                candidate.email,
                candidate.company,
            )

        elif status == "Rejected":

            send_rejected_email(
                candidate.name,
                candidate.email,
                candidate.company,
            )

    notifications.append(
        {
            "title": "Candidate Updated",
            "message": f"{candidate.name} status changed to {status}",
        }
    )

    return {
        "message": "Status Updated Successfully",
        "status": candidate.status,
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
        "id": candidate.id,
        "name": candidate.name,
        "status": candidate.status,

        "interview_date": candidate.interview_date,
        "interview_time": candidate.interview_time,

        "interview_mode": candidate.interview_mode,

        "interviewer_name": candidate.interviewer_name,

        "interview_round": candidate.interview_round,

        "meeting_link": candidate.meeting_link,

        "location": candidate.interview_location,

        "notes": candidate.interview_notes,
    }


@router.get("/notifications/all")
def get_notifications():

    return notifications


@router.delete("/{candidate_id}")
def cancel_interview(
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

    candidate.interview_date = None
    candidate.interview_time = None
    candidate.interview_mode = None
    candidate.interviewer_name = None

    candidate.interview_round = None
    candidate.meeting_link = None
    candidate.interview_location = None
    candidate.interview_notes = None

    candidate.status = "Pending"

    db.commit()

    db.refresh(candidate)

    notifications.append(
        {
            "title": "Interview Cancelled",
            "message": f"{candidate.name} interview cancelled.",
        }
    )

    return {
        "message": "Interview Cancelled Successfully",
    }