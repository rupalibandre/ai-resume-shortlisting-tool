from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc, asc

from app.database.connection import get_db
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/candidates",
    tags=["Candidates"],
)


# ==========================================================
# GET ALL CANDIDATES
# Search + Filter + Pagination + Sorting
# ==========================================================

@router.get("/")
def get_candidates(
    search: str = "",
    status: str = "",
    page: int = 1,
    limit: int = 10,
    sort: str = "match",
    db: Session = Depends(get_db),
):

    query = db.query(Candidate)

    if search:

        query = query.filter(

            or_(

                Candidate.name.ilike(f"%{search}%"),
                Candidate.email.ilike(f"%{search}%"),
                Candidate.job_title.ilike(f"%{search}%"),
                Candidate.company.ilike(f"%{search}%"),

            )

        )

    if status:

        query = query.filter(
            Candidate.status == status
        )

    if sort == "match":

        query = query.order_by(
            desc(Candidate.match_percentage)
        )

    elif sort == "latest":

        query = query.order_by(
            desc(Candidate.id)
        )

    elif sort == "name":

        query = query.order_by(
            asc(Candidate.name)
        )

    total = query.count()

    candidates = (

        query

        .offset((page - 1) * limit)

        .limit(limit)

        .all()

    )

    return {

        "total": total,

        "page": page,

        "limit": limit,

        "data": candidates,

    }


# ==========================================================
# GET SINGLE CANDIDATE
# ==========================================================

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


# ==========================================================
# UPDATE STATUS
# ==========================================================

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


# ==========================================================
# UPDATE NOTES
# ==========================================================

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


# ==========================================================
# DELETE CANDIDATE
# ==========================================================

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


# ==========================================================
# DASHBOARD STATS
# ==========================================================

@router.get("/stats/overview")
def candidate_stats(
    db: Session = Depends(get_db),
):

    total = db.query(Candidate).count()

    shortlisted = db.query(Candidate).filter(
        Candidate.status == "Shortlisted"
    ).count()

    interview = db.query(Candidate).filter(
        Candidate.status == "Interview Scheduled"
    ).count()

    selected = db.query(Candidate).filter(
        Candidate.status == "Selected"
    ).count()

    rejected = db.query(Candidate).filter(
        Candidate.status == "Rejected"
    ).count()

    pending = db.query(Candidate).filter(
        Candidate.status == "Pending"
    ).count()

    return {

        "total": total,
        "shortlisted": shortlisted,
        "interview": interview,
        "selected": selected,
        "rejected": rejected,
        "pending": pending,

    }