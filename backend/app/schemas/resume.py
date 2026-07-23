from pathlib import Path
import shutil

from fastapi import APIRouter, File, UploadFile, HTTPException

from app.services.resume_parser import extract_text

router = APIRouter(
    prefix="/resume",
    tags=["Resume"],
)

UPLOAD_FOLDER = "uploads"

Path(UPLOAD_FOLDER).mkdir(exist_ok=True)


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):

    allowed_extensions = [".pdf", ".docx"]

    extension = Path(file.filename).suffix.lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed.",
        )

    file_path = Path(UPLOAD_FOLDER) / file.filename

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = extract_text(str(file_path))

    return {
        "message": "Resume Uploaded Successfully",
        "filename": file.filename,
        "text": extracted_text,
    }