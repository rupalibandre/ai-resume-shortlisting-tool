import os
from datetime import datetime, timedelta, timezone

import bcrypt
from jose import JWTError, jwt


# ======================================================
# JWT CONFIG
# ======================================================

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60


if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured")


# ======================================================
# PASSWORD HASHING
# ======================================================

def hash_password(password: str) -> str:
    password_bytes = password.encode("utf-8")

    # bcrypt has a 72-byte maximum
    if len(password_bytes) > 72:
        raise ValueError("Password must be 72 bytes or fewer.")

    hashed = bcrypt.hashpw(
        password_bytes,
        bcrypt.gensalt(),
    )

    return hashed.decode("utf-8")


def verify_password(
    plain_password: str,
    hashed_password: str,
) -> bool:

    password_bytes = plain_password.encode("utf-8")

    if len(password_bytes) > 72:
        return False

    try:
        return bcrypt.checkpw(
            password_bytes,
            hashed_password.encode("utf-8"),
        )
    except (ValueError, TypeError):
        return False


# ======================================================
# CREATE JWT ACCESS TOKEN
# ======================================================

def create_access_token(data: dict) -> str:

    to_encode = data.copy()

    expire = datetime.now(timezone.utc) + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({
        "exp": expire
    })

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM,
    )


# ======================================================
# VERIFY JWT ACCESS TOKEN
# ======================================================

def verify_access_token(token: str):

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM],
        )

        # Make sure token has a subject
        if payload.get("sub") is None:
            return None

        return payload

    except JWTError:
        return None