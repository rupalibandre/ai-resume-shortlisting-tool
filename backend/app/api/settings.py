from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.settings import Settings

import os

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


# ============================
# Request Models
# ============================

class ProfileRequest(BaseModel):
    recruiter_name: str
    recruiter_email: str
    recruiter_designation: str


class CompanyRequest(BaseModel):
    company_name: str
    company_website: str
    company_location: str


class PasswordRequest(BaseModel):
    current_password: str
    new_password: str


# ============================
# Helper
# ============================

def get_settings(db: Session):

    settings = db.query(Settings).first()

    if settings is None:

        settings = Settings(
            recruiter_name="Rupali Bandre",
            recruiter_email="hr@company.com",
            recruiter_designation="HR Manager",
            company_name="AI Recruit Pvt Ltd",
            company_website="www.airecruit.com",
            company_location="Pune",
            password="admin123",
            profile_image="https://i.pravatar.cc/150"
        )

        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


# ============================
# PROFILE
# ============================

@router.get("/profile")
def get_profile(db: Session = Depends(get_db)):

    s = get_settings(db)

    return {
        "name": s.recruiter_name,
        "email": s.recruiter_email,
        "designation": s.recruiter_designation,
        "profile_image": s.profile_image,
    }


@router.put("/profile")
def update_profile(
    request: ProfileRequest,
    db: Session = Depends(get_db),
):

    s = get_settings(db)

    s.recruiter_name = request.recruiter_name
    s.recruiter_email = request.recruiter_email
    s.recruiter_designation = request.recruiter_designation

    db.commit()
    db.refresh(s)

    return {
        "message": "Profile Updated Successfully",
        "name": s.recruiter_name,
        "email": s.recruiter_email,
        "designation": s.recruiter_designation,
        "profile_image": s.profile_image,
    }


# ============================
# PROFILE IMAGE
# ============================

@router.post("/profile/upload")
async def upload_profile_image(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    s = get_settings(db)

    os.makedirs("uploads/profile", exist_ok=True)

    filename = image.filename

    filepath = f"uploads/profile/{filename}"

    with open(filepath, "wb") as buffer:
        buffer.write(await image.read())

    s.profile_image = f"http://127.0.0.1:8000/{filepath}"

    db.commit()
    db.refresh(s)

    return {
        "message": "Profile Image Updated Successfully",
        "profile_image": s.profile_image,
    }


# ============================
# COMPANY
# ============================

@router.get("/company")
def get_company(db: Session = Depends(get_db)):

    s = get_settings(db)

    return {
        "name": s.company_name,
        "website": s.company_website,
        "location": s.company_location,
    }


@router.put("/company")
def update_company(
    request: CompanyRequest,
    db: Session = Depends(get_db),
):

    s = get_settings(db)

    s.company_name = request.company_name
    s.company_website = request.company_website
    s.company_location = request.company_location

    db.commit()
    db.refresh(s)

    return {
        "message": "Company Updated Successfully",
        "name": s.company_name,
        "website": s.company_website,
        "location": s.company_location,
    }


# ============================
# PASSWORD
# ============================

@router.put("/password")
def change_password(
    request: PasswordRequest,
    db: Session = Depends(get_db),
):

    s = get_settings(db)

    if s.password != request.current_password:

        raise HTTPException(
            status_code=400,
            detail="Current Password Incorrect",
        )

    s.password = request.new_password

    db.commit()

    return {
        "message": "Password Changed Successfully"
    }