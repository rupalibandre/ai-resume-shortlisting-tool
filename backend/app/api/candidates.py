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
    candidates = db.query(Candidate).order_by(Candidate.id.desc()).all()

    return {
        "candidates": candidates
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
            detail="Candidate not found",
        )

    candidate.status = status

    db.commit()
    db.refresh(candidate)

    return {
        "message": "Status updated successfully",
        "candidate": candidate,
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
            detail="Candidate not found",
        )

    db.delete(candidate)
    db.commit()

    return {
        "message": "Candidate deleted successfully"
    }