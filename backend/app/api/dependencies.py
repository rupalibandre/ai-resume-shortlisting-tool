from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from app.utils.security import verify_access_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):

    token = credentials.credentials

    payload = verify_access_token(token)

    if payload is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or Expired Token",
        )

    return payload


def get_admin_user(
    current_user=Depends(get_current_user),
):

    role = current_user.get("role", "HR")

    if role != "Admin":

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin Access Required",
        )

    return current_user


def get_hr_user(
    current_user=Depends(get_current_user),
):

    role = current_user.get("role", "HR")

    if role not in ["Admin", "HR"]:

        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="HR Access Required",
        )

    return current_user