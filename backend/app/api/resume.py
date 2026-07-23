from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException, Form, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job

from app.services.resume_parser import extract_text
from app.services.groq_service import ai_resume_match

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)

UPLOAD_FOLDER = "uploads"

Path(UPLOAD_FOLDER).mkdir(exist_ok=True)


@router.post("/match")
async def match_resume(
    job_id: int = Form(...),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    allowed_extensions = [".pdf", ".docx"]

    extension = Path(file.filename).suffix.lower()

    if extension not in allowed_extensions:
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
            detail="Job not found",
        )

    file_path = Path(UPLOAD_FOLDER) / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text(str(file_path))

    ai_result = ai_resume_match(
        resume_text,
        job.description,
    )

    return {
        "filename": file.filename,
        "job": {
            "id": job.id,
            "title": job.title,
            "company": job.company,
        },
        "ai_result": ai_result,
    }