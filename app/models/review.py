import datetime
from .db import db
from .user import User
from .class1 import Class


class Review(db.Model):
    __tablename__ = "reviews"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    class_id = db.Column(db.Integer, db.ForeignKey("classes.id"), nullable=False)
    comment = db.Column(db.String(500), nullable=False)
    created_at = db.Column(db.DateTime,
                   nullable=False,
                   default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                   nullable=False,
                   default=datetime.datetime.utcnow)


    user = db.relationship("User")
    classes = db.relationship("Class", back_populates="review")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "class_id": self.class_id,
            "comment": self.comment,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }