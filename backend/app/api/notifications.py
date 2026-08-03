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


@router.put("/{notification_id}")
def mark_read(
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

    return {"message": "Notification Read"}


@router.put("/read-all")
def read_all(db: Session = Depends(get_db)):

    notifications = db.query(Notification).all()

    for n in notifications:
        n.is_read = True

    db.commit()

    return {"message": "All Notifications Read"}
@router.delete("/{notification_id}")
def delete_notification(
    notification_id: int,
    db: Session = Depends(get_db),
):

    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if notification:

        db.delete(notification)
        db.commit()

    return {
        "message": "Deleted Successfully"
    }