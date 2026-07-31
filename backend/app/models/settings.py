from sqlalchemy import Column, Integer, String

from app.database.connection import Base


class Settings(Base):
    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)

    recruiter_name = Column(String, default="Rupali Bandre")
    recruiter_email = Column(String, default="hr@company.com")
    recruiter_designation = Column(String, default="HR Manager")

    company_name = Column(String, default="AI Recruit Pvt Ltd")
    company_website = Column(String, default="www.airecruit.com")
    company_location = Column(String, default="Pune")

    password = Column(String, default="admin123")

    profile_image = Column(
        String,
        default="https://i.pravatar.cc/150"
    )