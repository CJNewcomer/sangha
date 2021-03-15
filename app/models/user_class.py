from .db import db


user_classes = db.Table(
    "user_classes", db.Model.metadata,
    db.Column("user_id", db.Integer, db.ForeignKey("users.id"),
                nullable=False),
    db.Column("class_id", db.Integer, db.ForeignKey("classes.id"),
                nullable=False),
    db.Column("review_id", db.Integer, db.ForeignKey("reviews.id"),
                nullable=True)

)
