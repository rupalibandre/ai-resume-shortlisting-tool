from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.connection import Base, engine

from app.api.auth import router as auth_router
from app.api.resume import router as resume_router
from app.api.jobs import router as jobs_router
from app.api.ai import router as ai_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Resume Shortlisting API",
    version="1.0.0",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(jobs_router)
app.include_router(ai_router)


@app.get("/")
def root():
    return {
        "message": "AI Resume Shortlisting Backend Running 🚀"
    }