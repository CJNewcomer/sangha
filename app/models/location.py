from .db import db


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    long = db.Column(db.Numeric, nullable=False)
    lat = db.Column(db.Numeric, nullable=False)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    classes = db.relationship("Class", back_populates="locations")


    def to_dict(self):
        return {
            "id": self.id,
            "long": self.long,
            "lat": self.lat,
            "city": self.city,
            "state": self.state,
            "country": self.country,
        }

    
