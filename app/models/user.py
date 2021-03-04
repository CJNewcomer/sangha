from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user_class import user_classes

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(40), nullable=False, unique=True)
  first_name = db.Column(db.String(40), nullable=False)
  last_name = db.Column(db.String(40), nullable=False)
  email = db.Column(db.String(100), nullable=False, unique=True)
  is_teacher = db.Column(db.Boolean)
  profile_image = db.Column(db.String(100), nullable=True, unique=True)
  hashed_password = db.Column(db.String(255), nullable=False)

  classes = db.relationship("Class", back_populates="user")
  reviews = db.relationship("Review", back_populates="user")
  user_class = db.relationship("Class", secondary=user_classes)
  sent_messages = db.relationship("Message",
                                  foreign_keys="Message.sender_id",
                                  back_populates="sender")
  received_messages = db.relationship("Message",
                                      foreign_keys="Message.receiver_id",
                                      back_populates="receiver")
  follow1 = db.relationship("Follow", foreign_keys="Follow.follower_id",
                                      back_populates="follower")
  follow2 = db.relationship("Follow", foreign_keys="Follow.followed_id",
                                      back_populates="followee")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "first_name": self.first_name,
      "last_name": self.last_name,
      "email": self.email,
      "profile_image": self.profile_image
    }
