from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.connection import get_db
from app.models.notification import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"],
)


@router.get("/")
def get_notifications(db: Session = Depends(get_db)):

    return (
        db.query(Notification)
        .order_by(Notification.id.desc())
        .all()
    )


@router.post("/sample")
def create_sample(db: Session = Depends(get_db)):

    data = [
        Notification(
            title="Resume Uploaded",
            message="New resume uploaded successfully."
        ),
        Notification(
            title="Candidate Shortlisted",
            message="AI shortlisted one candidate."
        ),
        Notification(
            title="Interview Scheduled",
            message="Interview has been scheduled."
        ),
    ]

    db.add_all(data)
    db.commit()

    return {"message": "Sample Notifications Added"}


@router.put("/{notification_id}")
def mark_as_read(
    notification_id: int,
    db: Session = Depends(get_db),
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if notification:

        notification.is_read = True

        db.commit()

    return {"message": "Updated"}