from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    Time,
    Text,
)

from app.database.connection import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    name = Column(
        String(255),
        nullable=False,
    )

    email = Column(
        String(255),
        nullable=True,
    )

    phone = Column(
        String(50),
        nullable=True,
    )

    filename = Column(
        String(255),
        nullable=False,
    )

    job_title = Column(
        String(255),
        nullable=False,
    )

    company = Column(
        String(255),
        nullable=False,
    )

    experience = Column(
        String(100),
        nullable=True,
    )

    skills = Column(
        Text,
        nullable=True,
    )

    ai_summary = Column(
        Text,
        nullable=True,
    )

    strengths = Column(
        Text,
        nullable=True,
    )

    weaknesses = Column(
        Text,
        nullable=True,
    )

    missing_skills = Column(
        Text,
        nullable=True,
    )

    interview_questions = Column(
        Text,
        nullable=True,
    )

    match_percentage = Column(
        Float,
        default=0,
        nullable=False,
    )

    status = Column(
        String(100),
        default="Pending",
        nullable=False,
    )

    interview_date = Column(
        Date,
        nullable=True,
    )

    interview_time = Column(
        Time,
        nullable=True,
    )

    interview_mode = Column(
        String(100),
        nullable=True,
    )

    interviewer_name = Column(
        String(255),
        nullable=True,
    )

    interview_round = Column(
        String(100),
        nullable=True,
    )

    meeting_link = Column(
        Text,
        nullable=True,
    )

    interview_location = Column(
        Text,
        nullable=True,
    )

    interview_notes = Column(
        Text,
        nullable=True,
    )

    notes = Column(
        Text,
        nullable=True,
    )