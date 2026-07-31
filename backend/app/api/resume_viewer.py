from pathlib import Path
from mimetypes import guess_type

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse

router = APIRouter(
    prefix="/viewer",
    tags=["Resume Viewer"],
)

BASE_DIR = Path(__file__).resolve().parents[2]
UPLOAD_FOLDER = BASE_DIR / "uploads"


@router.get("/{filename:path}")
def view_resume(filename: str):

    file_path = UPLOAD_FOLDER / filename

    if not file_path.exists():
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    media_type, _ = guess_type(str(file_path))

    return FileResponse(
        path=str(file_path),
        filename=file_path.name,
        media_type=media_type or "application/octet-stream",
    )