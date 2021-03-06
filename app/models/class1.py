import datetime
from .db import db 
from .user_class import user_classes


class Class(db.Model):
    __tablename__ = "classes"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    location_id = db.Column(db.Integer, db.ForeignKey("locations.id"), nullable=False)
    name = db.Column(db.String, nullable=False)
    type = db.Column(db.String, nullable=False)
    class_image = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    date = db.Column(db.Date, nullable=False)
    time = db.Column(db.DateTime(timezone=False), nullable=False)
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
    student = db.relationship("User", secondary=user_classes, back_populates="attend_classes")
    teacher = db.relationship("User", foreign_keys=[user_id], back_populates="teach_classes")

    def to_simple_dict(self):
        return {
            "id": self.id,
            "class_image": self.class_image,
            "teacher": self.teacher.first_name,
            "name": self.name,
            "date": self.date,
            "time": self.time.isoformat()
        }

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
            "time": self.time.isoformat(),
            "description": self.description,
            "price": self.price,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "teacher": self.teacher.to_dict(),
            "student": [student.to_dict() for student in self.student],
            "locations": self.locations.to_dict()
        }
    


