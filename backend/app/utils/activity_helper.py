from sqlalchemy.orm import Session

from app.models.activity import Activity


def add_activity(

    db: Session,

    title: str,

    description: str,

    icon: str = "📌",

):

    activity = Activity(

        title=title,

        description=description,

        icon=icon,

    )

    db.add(activity)

    db.commit()