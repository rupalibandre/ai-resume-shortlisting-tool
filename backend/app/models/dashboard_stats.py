from sqlalchemy import Column
from sqlalchemy import Integer

from app.database.connection import Base


class DashboardStats(Base):

    __tablename__ = "dashboard_stats"

    id = Column(Integer, primary_key=True)

    total_jobs = Column(Integer, default=0)

    total_candidates = Column(Integer, default=0)

    shortlisted = Column(Integer, default=0)

    interviews = Column(Integer, default=0)

    rejected = Column(Integer, default=0)

    average_match = Column(Integer, default=0)