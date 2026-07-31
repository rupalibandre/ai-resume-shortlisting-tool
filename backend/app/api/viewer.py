from pathlib import Path

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/viewer",
    tags=["Resume Viewer"],
)

BASE_DIR = Path(__file__).resolve().parents[2]
UPLOAD_FOLDER = BASE_DIR / "uploads"


@router.get("/{filename}")
def view_resume(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail=f"Resume not found: {file_path}",
        )

    media_type = (
        "application/pdf"
        if filename.lower().endswith(".pdf")
        else "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )

    response = FileResponse(
        path=file_path,
        media_type=media_type,
    )

    response.headers["Content-Disposition"] = "inline"

    return response