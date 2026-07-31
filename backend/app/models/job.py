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

    title = Column(
        String(255),
        nullable=False,
    )

    company = Column(
        String(255),
        nullable=False,
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