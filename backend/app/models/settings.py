from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import DateTime

from datetime import datetime

from app.database.connection import Base


class Settings(Base):

    __tablename__ = "settings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    # ===================================
    # Recruiter
    # ===================================

    recruiter_name = Column(
        String(255),
        default="Rupali Bandre",
        nullable=False,
    )

    recruiter_email = Column(
        String(255),
        default="hr@company.com",
        nullable=False,
    )

    recruiter_phone = Column(
        String(20),
        default="",
        nullable=True,
    )

    recruiter_designation = Column(
        String(255),
        default="HR Manager",
        nullable=False,
    )

    profile_image = Column(
        Text,
        default="https://i.pravatar.cc/300",
        nullable=True,
    )

    # ===================================
    # Company
    # ===================================

    company_name = Column(
        String(255),
        default="AI Recruit Pvt Ltd",
        nullable=False,
    )

    company_logo = Column(
        Text,
        default="",
        nullable=True,
    )

    company_website = Column(
        String(255),
        default="https://www.airecruit.com",
        nullable=True,
    )

    company_location = Column(
        String(255),
        default="Pune",
        nullable=True,
    )

    company_description = Column(
        Text,
        default="",
        nullable=True,
    )

    # ===================================
    # Security
    # ===================================

    password = Column(
    String(255),
    default="admin123",
    nullable=False,
)
    # ===================================
    # System
    # ===================================

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )
    