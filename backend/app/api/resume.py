from pathlib import Path
import shutil
import re

from fastapi import (
    APIRouter,
    File,
    UploadFile,
    HTTPException,
    Form,
    Depends,
)
from fastapi.responses import FileResponse

from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.job import Job
from app.models.candidate import Candidate

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

    candidate_name = file.filename.replace(extension, "")

    first_line = resume_text.split("\n")[0].strip()

    if 3 < len(first_line) < 50:
        candidate_name = first_line

    match_percentage = 0

    numbers = re.findall(r"\d+", str(ai_result))

    for number in numbers:

        value = int(number)

        if 0 <= value <= 100:
            match_percentage = value
            break

    candidate = Candidate(
        name=candidate_name,
        filename=file.filename,
        job_title=job.title,
        company=job.company,
        match_percentage=match_percentage,
        status="Pending",
    )

    db.add(candidate)
    db.commit()
    db.refresh(candidate)

    return {
        "candidate": {
            "id": candidate.id,
            "name": candidate.name,
            "filename": candidate.filename,
            "job_title": candidate.job_title,
            "company": candidate.company,
            "match_percentage": candidate.match_percentage,
            "status": candidate.status,
        },
        "ai_result": ai_result,
    }


@router.get("/view/{filename}")
def view_resume(filename: str):

    file_path = Path(UPLOAD_FOLDER) / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return FileResponse(
        path=file_path,
        filename=filename,
        media_type="application/pdf",
    )