from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"],
)


@router.get("/")
def get_candidates(db: Session = Depends(get_db)):

    candidates = (
        db.query(Candidate)
        .order_by(Candidate.match_percentage.desc())
        .all()
    )

    return candidates


@router.get("/{candidate_id}")
def get_candidate(
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
            detail="Candidate Not Found",
        )

    return {
        "id": candidate.id,
        "name": candidate.name,
        "email": candidate.email,
        "phone": candidate.phone,
        "filename": candidate.filename,
        "job_title": candidate.job_title,
        "company": candidate.company,
        "experience": candidate.experience,
        "skills": candidate.skills,

        "match_percentage": candidate.match_percentage,
        "status": candidate.status,

        "summary": candidate.ai_summary,
        "strengths": candidate.strengths,
        "weaknesses": candidate.weaknesses,
        "missing_skills": candidate.missing_skills,
        "interview_questions": candidate.interview_questions,

        "interview_date": candidate.interview_date,
        "interview_time": candidate.interview_time,
        "interview_mode": candidate.interview_mode,
        "interviewer_name": candidate.interviewer_name,
        "interview_round": candidate.interview_round,
        "meeting_link": candidate.meeting_link,
        "location": candidate.interview_location,
        "interview_notes": candidate.interview_notes,

        "notes": candidate.notes,
    }


@router.put("/{candidate_id}/status")
def update_candidate_status(
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
            detail="Candidate Not Found",
        )

    candidate.status = status

    db.commit()
    db.refresh(candidate)

    return {
        "message": "Status Updated Successfully",
        "status": candidate.status,
    }


@router.put("/notes/{candidate_id}")
def update_notes(
    candidate_id: int,
    notes: str,
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
            detail="Candidate Not Found",
        )

    candidate.notes = notes

    db.commit()
    db.refresh(candidate)

    return {
        "message": "Notes Updated",
        "notes": candidate.notes,
    }


@router.delete("/{candidate_id}")
def delete_candidate(
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
            detail="Candidate Not Found",
        )

    db.delete(candidate)
    db.commit()

    return {
        "message": "Candidate Deleted Successfully"
    }