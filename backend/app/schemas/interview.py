from pydantic import BaseModel
from datetime import date, time


class InterviewSchedule(BaseModel):
    interview_date: date
    interview_time: time
    interview_mode: str
    interviewer_name: str