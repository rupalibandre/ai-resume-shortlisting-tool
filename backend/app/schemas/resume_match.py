from pydantic import BaseModel


class ResumeMatchRequest(BaseModel):
    job_id: int