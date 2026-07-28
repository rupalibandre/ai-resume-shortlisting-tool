from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    Date,
    Time,
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

    match_percentage = Column(
        Float,
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