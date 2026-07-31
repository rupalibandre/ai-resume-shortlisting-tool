import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "AI_RESUME_SHORTLISTING_SECRET_KEY_2026"
)

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = int(
    os.getenv(
        "ACCESS_TOKEN_EXPIRE_MINUTES",
        1440
    )
)

GROQ_API_KEY = os.getenv(
    "GROQ_API_KEY",
    ""
)

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:postgres@localhost:5432/ai_resume_db"
)

EMAIL_HOST = os.getenv(
    "EMAIL_HOST",
    "smtp.gmail.com"
)

EMAIL_PORT = int(
    os.getenv(
        "EMAIL_PORT",
        587
    )
)

EMAIL_USERNAME = os.getenv(
    "EMAIL_USERNAME",
    ""
)

EMAIL_PASSWORD = os.getenv(
    "EMAIL_PASSWORD",
    ""
)

EMAIL_FROM = os.getenv(
    "EMAIL_FROM",
    EMAIL_USERNAME
)