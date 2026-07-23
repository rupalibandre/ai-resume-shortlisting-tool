from fastapi import Depends, HTTPException
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.utils.security import verify_access_token

security = HTTPBearer()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
):
    token = credentials.credentials

    print("========== JWT DEBUG ==========")
    print("Scheme:", credentials.scheme)
    print("Token:", token)

    payload = verify_access_token(token)

    print("Payload:", payload)
    print("===============================")

    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token",
        )

    return payload