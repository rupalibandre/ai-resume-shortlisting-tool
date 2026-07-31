from pathlib import Path
import shutil
import re
import uuid
from datetime import datetime

from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException,
    Form,
    Depends,
)

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.models.candidate import Candidate

from app.services.resume_parser import extract_text
from app.services.groq_service import ai_resume_match
from app.services.pdf_converter import convert_docx_to_pdf

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)

UPLOAD_FOLDER = "uploads"
Path(UPLOAD_FOLDER).mkdir(exist_ok=True)


# --------------------------
# Helper Functions
# --------------------------

def extract_email(text: str):

    match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
    )

    return match.group(0) if match else None


def extract_phone(text: str):

    match = re.search(
        r"(\+91[\-\s]?)?[6-9]\d{9}",
        text,
    )

    return match.group(0) if match else None


def estimate_experience(text: str):

    years = re.findall(
        r"(\d+)\+?\s*years?",
        text.lower(),
    )

    if years:

        return max(years) + " Years"

    return "Fresher"


def extract_skills(text):

    master_skills = [

        "Python",
        "Java",
        "FastAPI",
        "React",
        "Node",
        "Express",
        "MongoDB",
        "PostgreSQL",
        "MySQL",
        "Docker",
        "Git",
        "GitHub",
        "REST API",
        "HTML",
        "CSS",
        "JavaScript",
        "Tailwind",
        "Bootstrap",
        "Machine Learning",
        "AI",
        "SQL",

    ]

    found = []

    lower = text.lower()

    for skill in master_skills:

        if skill.lower() in lower:

            found.append(skill)

    return found


def generate_unique_filename(filename):

    extension = Path(filename).suffix

    unique = uuid.uuid4().hex[:10]

    return f"{unique}_{filename.replace(' ', '_')}"


def duplicate_resume(db, email, phone):

    if email:

        candidate = (
            db.query(Candidate)
            .filter(Candidate.email == email)
            .first()
        )

        if candidate:

            return True

    if phone:

        candidate = (
            db.query(Candidate)
            .filter(Candidate.phone == phone)
            .first()
        )

        if candidate:

            return True

    return False@router.post("/match")
async def match_resume(
    job_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    extension = Path(file.filename).suffix.lower()

    if extension not in [".pdf", ".docx"]:

        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed.",
        )

    job = (
        db.query(Job)
        .filter(Job.id == job_id)
        .first()
    )

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job Not Found",
        )

    unique_filename = generate_unique_filename(
        file.filename
    )

    file_path = (
        Path(UPLOAD_FOLDER)
        / unique_filename
    )

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(
            file.file,
            buffer,
        )

    saved_resume_path = str(file_path)

    if extension == ".docx":

        saved_resume_path = convert_docx_to_pdf(
            saved_resume_path
        )

    resume_text = extract_text(
        saved_resume_path
    )

    if not resume_text:

        raise HTTPException(
            status_code=400,
            detail="Unable to extract resume text.",
        )

    email = extract_email(
        resume_text
    )

    phone = extract_phone(
        resume_text
    )

    if duplicate_resume(
        db,
        email,
        phone,
    ):

        raise HTTPException(
            status_code=409,
            detail="This resume already exists.",
        )

    experience = estimate_experience(
        resume_text
    )

    skills = extract_skills(
        resume_text
    )

    ai = ai_resume_match(
        resume_text,
        job.description,
    )

    match_percentage = float(
        ai.get(
            "match_percentage",
            0,
        )
    )

    ats_score = round(
        (match_percentage * 0.90) + 10,
        2,
    )

    candidate_name = ai.get(
        "candidate_name"
    )

    if not candidate_name:

        candidate_name = (
            file.filename
            .replace(extension, "")
            .replace("_", " ")
        )

    candidate = Candidate(

        name=candidate_name,

        email=email,

        phone=phone,

        filename=Path(
            saved_resume_path
        ).name,

        job_title=job.title,

        company=job.company,

        experience=experience,

        skills=", ".join(skills),

        match_percentage=match_percentage,

        ai_summary=ai.get(
            "summary",
            "",
        ),

        strengths="\n".join(
            ai.get(
                "strengths",
                [],
            )
        ),

        weaknesses="\n".join(
            ai.get(
                "weaknesses",
                [],
            )
        ),

        missing_skills="\n".join(
            ai.get(
                "missing_skills",
                [],
            )
        ),

        interview_questions="\n".join(
            ai.get(
                "interview_questions",
                [],
            )
        ),

        status="Pending",

        notes=(
            f"ATS Score : {ats_score}\n"
            f"Uploaded : {datetime.now().strftime('%d-%m-%Y %H:%M')}"
        ),

    )

    db.add(candidate)

    db.commit()

    db.refresh(candidate)    
    return {
        "message": "Resume Analysed Successfully",
        "candidate": {
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
            "notes": candidate.notes,
        },
    }


@router.get("/history")
def resume_history(
    db: Session = Depends(get_db),
):

    candidates = (
        db.query(Candidate)
        .order_by(Candidate.id.desc())
        .all()
    )

    return [

        {
            "id": c.id,
            "name": c.name,
            "job": c.job_title,
            "company": c.company,
            "score": c.match_percentage,
            "status": c.status,
            "uploaded": c.notes,
        }

        for c in candidates

    ]


@router.get("/{candidate_id}")
def resume_details(
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

    return candidate


@router.delete("/{candidate_id}")
def delete_resume(
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

    resume = (
        Path(UPLOAD_FOLDER)
        / candidate.filename
    )

    if resume.exists():

        resume.unlink()

    db.delete(candidate)

    db.commit()

    return {
        "message": "Resume Deleted Successfully"
    }


@router.post("/reanalyze/{candidate_id}")
def reanalyze_resume(
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

    file_path = (
        Path(UPLOAD_FOLDER)
        / candidate.filename
    )

    if not file_path.exists():

        raise HTTPException(
            status_code=404,
            detail="Resume File Missing",
        )

    resume_text = extract_text(
        str(file_path)
    )

    job = (
        db.query(Job)
        .filter(Job.title == candidate.job_title)
        .first()
    )

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job Not Found",
        )

    ai = ai_resume_match(
        resume_text,
        job.description,
    )

    candidate.match_percentage = float(
        ai.get(
            "match_percentage",
            0,
        )
    )

    candidate.ai_summary = ai.get(
        "summary",
        "",
    )

    candidate.strengths = "\n".join(
        ai.get(
            "strengths",
            [],
        )
    )

    candidate.weaknesses = "\n".join(
        ai.get(
            "weaknesses",
            [],
        )
    )

    candidate.missing_skills = "\n".join(
        ai.get(
            "missing_skills",
            [],
        )
    )

    candidate.interview_questions = "\n".join(
        ai.get(
            "interview_questions",
            [],
        )
    )

    db.commit()

    db.refresh(candidate)

    return {
        "message": "Resume Re-Analysed Successfully",
        "candidate": candidate,
    }