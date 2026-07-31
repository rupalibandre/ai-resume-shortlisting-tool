import random

from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.user import User

from app.schemas.password import (
    ForgotPasswordRequest,
    VerifyOTPRequest,
    ResetPasswordRequest,
)

from app.utils.security import hash_password
from app.services.email_service import send_email

router = APIRouter(
    prefix="/password",
    tags=["Password"],
)

otp_storage = {}


@router.post("/forgot")
def forgot_password(
    request: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):

    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Email not found",
        )

    otp = str(random.randint(100000, 999999))

    otp_storage[request.email] = otp

    send_email(
        to_email=request.email,
        subject="Password Reset OTP",
        body=f"Your OTP is: {otp}",
    )

    return {
        "message": "OTP sent successfully"
    }


@router.post("/verify")
def verify_otp(request: VerifyOTPRequest):

    saved = otp_storage.get(request.email)

    if saved != request.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP",
        )

    return {
        "message": "OTP Verified"
    }


@router.post("/reset")
def reset_password(
    request: ResetPasswordRequest,
    db: Session = Depends(get_db),
):

    saved = otp_storage.get(request.email)

    if saved != request.otp:
        raise HTTPException(
            status_code=400,
            detail="Invalid OTP",
        )

    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    user.password = hash_password(
        request.new_password
    )

    db.commit()

    otp_storage.pop(
        request.email,
        None,
    )

    return {
        "message": "Password Reset Successfully"
    }