from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_, asc, desc

from app.database.connection import get_db
from app.models.job import Job
from app.schemas.job import JobCreate

router = APIRouter(
    prefix="/jobs",
    tags=["Jobs"],
)


# ======================================================
# CREATE JOB
# ======================================================

@router.post("/")
def create_job(
    job: JobCreate,
    db: Session = Depends(get_db),
):

    new_job = Job(

        title=job.title,
        company=job.company,

        department=job.department,

        location=job.location,

        employment_type=job.employment_type,

        experience=job.experience,

        salary=job.salary,

        skills=job.skills,

        description=job.description,

        vacancies=job.vacancies,

        deadline=job.deadline,

        recruiter=job.recruiter,

        priority=job.priority,

        status=job.status,

    )

    db.add(new_job)

    db.commit()

    db.refresh(new_job)

    return {

        "message": "Job Created Successfully",

        "job": new_job,

    }


# ======================================================
# GET ALL JOBS
# Search + Filter + Pagination
# ======================================================

@router.get("/")
def get_all_jobs(

    search: str = "",

    status: str = "",

    page: int = 1,

    limit: int = 10,

    sort: str = "latest",

    db: Session = Depends(get_db),

):

    query = db.query(Job)

    if search:

        query = query.filter(

            or_(

                Job.title.ilike(f"%{search}%"),

                Job.company.ilike(f"%{search}%"),

                Job.department.ilike(f"%{search}%"),

                Job.location.ilike(f"%{search}%"),

            )

        )

    if status:

        query = query.filter(

            Job.status == status

        )

    if sort == "latest":

        query = query.order_by(

            desc(Job.id)

        )

    elif sort == "title":

        query = query.order_by(

            asc(Job.title)

        )

    elif sort == "vacancies":

        query = query.order_by(

            desc(Job.vacancies)

        )

    total = query.count()

    jobs = (

        query

        .offset((page - 1) * limit)

        .limit(limit)

        .all()

    )

    return {

        "total": total,

        "page": page,

        "limit": limit,

        "jobs": jobs,

    }


# ======================================================
# GET SINGLE JOB
# ======================================================

@router.get("/{job_id}")
def get_single_job(

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

    return job
# ======================================================
# UPDATE JOB
# ======================================================

@router.put("/{job_id}")
def update_job(

    job_id: int,

    updated_job: JobCreate,

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

    job.title = updated_job.title
    job.company = updated_job.company
    job.department = updated_job.department
    job.location = updated_job.location
    job.employment_type = updated_job.employment_type
    job.experience = updated_job.experience
    job.salary = updated_job.salary
    job.skills = updated_job.skills
    job.description = updated_job.description
    job.vacancies = updated_job.vacancies
    job.deadline = updated_job.deadline
    job.recruiter = updated_job.recruiter
    job.priority = updated_job.priority
    job.status = updated_job.status

    db.commit()

    db.refresh(job)

    return {

        "message": "Job Updated Successfully",

        "job": job,

    }


# ======================================================
# DELETE JOB
# ======================================================

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


# ======================================================
# CLONE JOB
# ======================================================

@router.post("/{job_id}/clone")
def clone_job(

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

    cloned = Job(

        title=job.title + " (Copy)",

        company=job.company,

        department=job.department,

        location=job.location,

        employment_type=job.employment_type,

        experience=job.experience,

        salary=job.salary,

        skills=job.skills,

        description=job.description,

        vacancies=job.vacancies,

        deadline=job.deadline,

        recruiter=job.recruiter,

        priority=job.priority,

        status="Open",

    )

    db.add(cloned)

    db.commit()

    db.refresh(cloned)

    return {

        "message": "Job Cloned Successfully",

        "job": cloned,

    }


# ======================================================
# CLOSE HIRING
# ======================================================

@router.put("/{job_id}/close")
def close_job(

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

    job.status = "Closed"

    db.commit()

    db.refresh(job)

    return {

        "message": "Hiring Closed",

        "status": job.status,

    }


# ======================================================
# DASHBOARD ANALYTICS
# ======================================================

@router.get("/stats/overview")
def job_statistics(

    db: Session = Depends(get_db),

):

    jobs = db.query(Job).all()

    total = len(jobs)

    active = db.query(Job).filter(Job.status == "Open").count()

    closed = db.query(Job).filter(Job.status == "Closed").count()

    applicants = sum(j.applicants for j in jobs)

    shortlisted = sum(j.shortlisted for j in jobs)

    interviewed = sum(j.interviewed for j in jobs)

    selected = sum(j.selected for j in jobs)

    return {

        "total_jobs": total,

        "active_jobs": active,

        "closed_jobs": closed,

        "total_applicants": applicants,

        "shortlisted": shortlisted,

        "interviewed": interviewed,

        "selected": selected,

    }