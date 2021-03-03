import datetime
from .db import db


class Follow(db.Model):
    __table__ = "follows"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    followed_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    follower_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="follow")

