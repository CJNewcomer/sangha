import json
from app.models import db, Review


def seed_review():
    new_reviews = []
    with open('./app/seeds/reviews.json') as f:
        data = json.load(f)
        for review in data:
            new_review = Review(**review)
            new_reviews.append(new_review)

    db.session.add_all(new_reviews)
    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews CASCADE;')
    db.session.commit()