from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.activity import Activity

router = APIRouter(
    prefix="/activity",
    tags=["Activity"],
)


@router.get("/")
def get_activity(
    db: Session = Depends(get_db),
):

    data = (
        db.query(Activity)
        .order_by(Activity.created_at.desc())
        .limit(20)
        .all()
    )

    return data