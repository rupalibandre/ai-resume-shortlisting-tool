from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.database.connection import Base, engine

from app.api.auth import router as auth_router
from app.api.jobs import router as jobs_router
from app.api.resume import router as resume_router
from app.api.candidates import router as candidates_router
from app.api.dashboard import router as dashboard_router
from app.api.reports import router as reports_router
from app.api.interview import router as interview_router

from app.api.password import router as password_router
from app.api import viewer
from app.api.settings import router as settings_router
from app.api.notifications import router as notifications_router
from app.api.activity import router as activity_router


# ======================================================
# DATABASE
# ======================================================

Base.metadata.create_all(bind=engine)


# ======================================================
# FASTAPI APP
# ======================================================

app = FastAPI(
    title="AI Resume Shortlisting Tool",
)


# ======================================================
# CORS
# ======================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "https://ai-resume-shortlisting-tool.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ======================================================
# STATIC UPLOADS
# ======================================================

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads",
)


# ======================================================
# ROUTERS
# ======================================================

app.include_router(auth_router)
app.include_router(password_router)
app.include_router(jobs_router)
app.include_router(resume_router)
app.include_router(candidates_router)
app.include_router(interview_router)
app.include_router(dashboard_router)
app.include_router(reports_router)

app.include_router(viewer.router)
app.include_router(settings_router)
app.include_router(notifications_router)
app.include_router(activity_router)


# ======================================================
# ROOT
# ======================================================

@app.get("/")
def root():
    return {
        "message": "AI Resume Shortlisting Tool API Running"
    }