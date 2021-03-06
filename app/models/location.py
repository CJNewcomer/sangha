from .db import db


class Location(db.Model):
    __tablename__ = 'locations'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    long = db.Column(db.Numeric, nullable=True)
    lat = db.Column(db.Numeric, nullable=True)
    city = db.Column(db.String(30), nullable=False)
    state = db.Column(db.String(2), nullable=False)
    country = db.Column(db.String(50), nullable=False)

    classes = db.relationship("Class", back_populates="locations")


    def to_dict(self):
        return {
            "id": self.id,
            "long": float(self.long or 0),
            "lat": float(self.lat or 0),
            "city": self.city,
            "state": self.state,
            "country": self.country,
        }

    
