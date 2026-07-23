from pydantic import BaseModel


class AIMatchRequest(BaseModel):
    job_id: int
    resume_text: str