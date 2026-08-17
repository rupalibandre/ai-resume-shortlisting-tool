from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
    UploadFile,
    File,
)

from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.database.connection import get_db
from app.models.settings import Settings

import os
import uuid
import shutil
import bcrypt
from urllib.parse import urlparse


router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


# ======================================================
# UPLOAD DIRECTORIES
# ======================================================

UPLOAD_PROFILE = "uploads/profile"
UPLOAD_COMPANY = "uploads/company"

os.makedirs(UPLOAD_PROFILE, exist_ok=True)
os.makedirs(UPLOAD_COMPANY, exist_ok=True)


# ======================================================
# REQUEST MODELS
# ======================================================

class ProfileRequest(BaseModel):
    recruiter_name: str
    recruiter_email: EmailStr
    recruiter_phone: str
    recruiter_designation: str


class CompanyRequest(BaseModel):
    company_name: str
    company_website: str
    company_location: str
    company_description: str


class PasswordRequest(BaseModel):
    current_password: str
    new_password: str


# ======================================================
# HELPERS
# ======================================================

ALLOWED_IMAGE_TYPES = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
]


def validate_image(filename: str):
    ext = os.path.splitext(filename)[1].lower()

    if ext not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, PNG and WEBP images allowed",
        )


def validate_website(url: str):
    if not url:
        return ""

    url = url.strip()

    if not url.startswith(("http://", "https://")):
        url = "https://" + url

    parsed = urlparse(url)

    if not parsed.netloc:
        raise HTTPException(
            status_code=400,
            detail="Invalid Website URL",
        )

    return url


def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        raise ValueError(
            "Password must be 72 bytes or fewer."
        )

    return bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt(),
    ).decode("utf-8")


def verify_password(
    password: str,
    hashed: str,
):
    password_bytes = password.encode("utf-8")

    if len(password_bytes) > 72:
        return False

    try:
        return bcrypt.checkpw(
            password_bytes,
            hashed.encode("utf-8"),
        )
    except (ValueError, TypeError):
        # Support old plain-text passwords if any exist
        return password == hashed


def get_settings(db: Session):
    settings = db.query(Settings).first()

    if settings:
        return settings

    settings = Settings(
        recruiter_name="Rupali Bandre",
        recruiter_email="hr@company.com",
        recruiter_phone="",
        recruiter_designation="HR Manager",
        company_name="AI Recruit Pvt Ltd",
        company_website="https://www.airecruit.com",
        company_location="Pune",
        company_description="",
        password=hash_password("admin123"),
        profile_image="https://i.pravatar.cc/300",
        company_logo="",
    )

    db.add(settings)
    db.commit()
    db.refresh(settings)

    return settings


# ======================================================
# PROFILE
# ======================================================

@router.get("/profile")
def get_profile(
    db: Session = Depends(get_db),
):
    s = get_settings(db)

    return {
        "name": s.recruiter_name,
        "email": s.recruiter_email,
        "phone": s.recruiter_phone,
        "designation": s.recruiter_designation,
        "profile_image": s.profile_image,
    }


@router.put("/profile")
def update_profile(
    request: ProfileRequest,
    db: Session = Depends(get_db),
):
    s = get_settings(db)

    s.recruiter_name = request.recruiter_name.strip()
    s.recruiter_email = request.recruiter_email.strip()
    s.recruiter_phone = request.recruiter_phone.strip()
    s.recruiter_designation = request.recruiter_designation.strip()

    db.commit()
    db.refresh(s)

    return {
        "message": "Profile Updated Successfully",
        "name": s.recruiter_name,
        "email": s.recruiter_email,
        "phone": s.recruiter_phone,
        "designation": s.recruiter_designation,
        "profile_image": s.profile_image,
    }


# ======================================================
# PROFILE IMAGE
# ======================================================

@router.post("/profile/upload")
async def upload_profile_image(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    validate_image(image.filename)

    s = get_settings(db)

    extension = os.path.splitext(
        image.filename
    )[1].lower()

    filename = f"{uuid.uuid4()}{extension}"

    filepath = os.path.join(
        UPLOAD_PROFILE,
        filename,
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer,
        )

    s.profile_image = (
        f"https://backend-jpo6.onrender.com/"
        f"uploads/profile/{filename}"
    )

    db.commit()
    db.refresh(s)

    return {
        "message": "Profile Image Updated Successfully",
        "profile_image": s.profile_image,
    }


# ======================================================
# COMPANY LOGO
# ======================================================

@router.post("/company/logo")
async def upload_company_logo(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    validate_image(image.filename)

    s = get_settings(db)

    extension = os.path.splitext(
        image.filename
    )[1].lower()

    filename = f"{uuid.uuid4()}{extension}"

    filepath = os.path.join(
        UPLOAD_COMPANY,
        filename,
    )

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(
            image.file,
            buffer,
        )

    s.company_logo = (
        f"https://backend-jpo6.onrender.com/"
        f"uploads/company/{filename}"
    )

    db.commit()
    db.refresh(s)

    return {
        "message": "Company Logo Updated Successfully",
        "company_logo": s.company_logo,
    }


# ======================================================
# COMPANY
# ======================================================

@router.get("/company")
def get_company(
    db: Session = Depends(get_db),
):
    s = get_settings(db)

    return {
        "name": s.company_name,
        "website": s.company_website,
        "location": s.company_location,
        "description": s.company_description,
        "logo": s.company_logo,
    }


@router.put("/company")
def update_company(
    request: CompanyRequest,
    db: Session = Depends(get_db),
):
    website = validate_website(
        request.company_website
    )

    s = get_settings(db)

    s.company_name = request.company_name.strip()
    s.company_website = website
    s.company_location = request.company_location.strip()
    s.company_description = (
        request.company_description.strip()
    )

    db.commit()
    db.refresh(s)

    return {
        "message": "Company Updated Successfully",
        "name": s.company_name,
        "website": s.company_website,
        "location": s.company_location,
        "description": s.company_description,
        "logo": s.company_logo,
    }


# ======================================================
# PASSWORD
# ======================================================

@router.put("/password")
def change_password(
    request: PasswordRequest,
    db: Session = Depends(get_db),
):
    s = get_settings(db)

    if not verify_password(
        request.current_password,
        s.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Current Password Incorrect",
        )

    if len(request.new_password.encode("utf-8")) > 72:
        raise HTTPException(
            status_code=400,
            detail="Password must be 72 bytes or fewer",
        )

    if len(request.new_password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must contain at least 6 characters",
        )

    s.password = hash_password(
        request.new_password
    )

    db.commit()

    return {
        "message": "Password Changed Successfully"
    }