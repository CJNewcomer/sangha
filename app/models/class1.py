import datetime
from .db import db


class Class(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    class_image = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    time = db.Column(db.DateTime, nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime,
                           nullable=False,
                           default=datetime.datetime.utcnow)

    
    locations = db.relationship("Location", back_populates="classes")
    review = db.relationship("Review", back_populates="classes")
    student = db.relationship("User", back_populates="attend_classes")
    teacher = db.relationship("User", back_populates="teach_classes")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "location_id": self.location_id,
            "name": self.name,
            "type": self.type,
            "class_image": self.class_image,
            "location": self.location,
            "date": self.date,
            "time": self.time,
            "description": self.description,
            "price": self.price,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "teacher": self.teacher.to_dict(),
            "student": self.student.to_dict()
        }
    


