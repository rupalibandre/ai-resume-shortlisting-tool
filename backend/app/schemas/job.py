from pydantic import BaseModel
from datetime import date
from typing import Optional


class JobCreate(BaseModel):

    title: str

    company: str

    department: str

    location: str

    employment_type: str

    experience: str

    salary: str

    skills: str

    description: str

    vacancies: int

    deadline: Optional[date] = None

    recruiter: str

    priority: str

    status: str


class JobResponse(JobCreate):

    id: int

    applicants: int

    shortlisted: int

    interviewed: int

    selected: int

    rejected: int

    class Config:

        from_attributes = True