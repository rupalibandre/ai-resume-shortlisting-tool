from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Date
from sqlalchemy import Time

from app.database.connection import Base


class Interview(Base):

    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)

    candidate_name = Column(String)

    job_title = Column(String)

    interview_date = Column(Date)

    interview_time = Column(Time)

    interviewer = Column(String)

    status = Column(
        String,
        default="Scheduled",
    )