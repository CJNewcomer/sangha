import datetime
from .db import db


class Message(db.Model):
    __tablename__ = "messages"

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)    
    receiver_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)    
    message = db.Column(db.String(500), nullable=False)
    timestamp = db.Column(db.DateTime,
                          nullable=False,
                          default=datetime.datetime.utcnow)

    sender = db.relationship("User",
                             foreign_keys=[sender_id],
                             back_populates="sent_messages")
    receiver = db.relationship("User",
                                foreign_keys=[receiver_id],
                                back_populates="received_messages")


    def to_dict(self):
        return {
            "id": self.id,
            "sender_id": self.sender_id,
            "receiver_id": self.receiver_id,
            "message": self.message,
            "timestamp": self.timestamp,
            "sender": self.sender.to_dict(),
            "receiver": self.receiver.to_dict()
        }