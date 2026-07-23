from pydantic import BaseModel


class JobCreate(BaseModel):
    title: str
    company: str
    location: str
    experience: str
    skills: str
    description: str


class JobResponse(JobCreate):
    id: int

    class Config:
        from_attributes = True