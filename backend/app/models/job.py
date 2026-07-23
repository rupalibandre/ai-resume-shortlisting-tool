from sqlalchemy import Column, Integer, String, Text

from app.database.connection import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    company = Column(String(255), nullable=False)

    location = Column(String(255), nullable=False)

    experience = Column(String(100), nullable=False)

    skills = Column(Text, nullable=False)

    description = Column(Text, nullable=False)