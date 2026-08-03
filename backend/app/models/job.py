from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Date,
)

from app.database.connection import Base


class Job(Base):

    __tablename__ = "jobs"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ==========================
    # Basic Details
    # ==========================

    title = Column(
        String(255),
        nullable=False,
    )

    company = Column(
        String(255),
        nullable=False,
    )

    department = Column(
        String(255),
        default="General",
    )

    location = Column(
        String(255),
        nullable=False,
    )

    employment_type = Column(
        String(100),
        default="Full Time",
    )

    experience = Column(
        String(100),
        nullable=True,
    )

    salary = Column(
        String(100),
        nullable=True,
    )

    skills = Column(
        Text,
        nullable=True,
    )

    description = Column(
        Text,
        nullable=False,
    )

    vacancies = Column(
        Integer,
        default=1,
    )

    deadline = Column(
        Date,
        nullable=True,
    )

    status = Column(
        String(50),
        default="Open",
    )

    # ==========================
    # Analytics
    # ==========================

    applicants = Column(
        Integer,
        default=0,
    )

    shortlisted = Column(
        Integer,
        default=0,
    )

    interviewed = Column(
        Integer,
        default=0,
    )

    selected = Column(
        Integer,
        default=0,
    )

    rejected = Column(
        Integer,
        default=0,
    )

    # ==========================
    # AI
    # ==========================

    ai_description = Column(
        Text,
        nullable=True,
    )

    ai_skills = Column(
        Text,
        nullable=True,
    )

    # ==========================
    # Recruiter
    # ==========================

    recruiter = Column(
        String(255),
        default="HR Manager",
    )

    priority = Column(
        String(50),
        default="Medium",
    )

    hiring_stage = Column(
        String(100),
        default="Screening",
    )