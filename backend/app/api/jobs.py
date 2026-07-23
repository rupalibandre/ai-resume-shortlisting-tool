from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.schemas.job import JobCreate

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


@router.post("/")
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    new_job = Job(
        title=job.title,
        company=job.company,
        location=job.location,
        experience=job.experience,
        skills=job.skills,
        description=job.description,
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return {
        "message": "Job Created Successfully",
        "job": new_job,
    }


@router.get("/")
def get_all_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()

    return {
        "count": len(jobs),
        "jobs": jobs,
    }


@router.get("/{job_id}")
def get_single_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return job


@router.put("/{job_id}")
def update_job(
    job_id: int,
    updated_job: JobCreate,
    db: Session = Depends(get_db),
):
    job = db.query(Job).filter(Job.id == job_id).first()

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    job.title = updated_job.title
    job.company = updated_job.company
    job.location = updated_job.location
    job.experience = updated_job.experience
    job.skills = updated_job.skills
    job.description = updated_job.description

    db.commit()
    db.refresh(job)

    return {
        "message": "Job Updated Successfully",
        "job": job,
    }
@router.delete("/{job_id}")
def delete_job(
    job_id: int,
    db: Session = Depends(get_db),
):
    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    db.delete(job)
    db.commit()

    return {
        "message": "Job Deleted Successfully"
    }