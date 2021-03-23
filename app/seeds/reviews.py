from app.models import db, Class, User, Review


def seed_review():

    user1 = User.query.filter_by(username="Demo").first()
    yoga_class1 = Class.query.filter_by(type="Ashtanga").first()
    yoga_class2 = Class.query.filter_by(type="Yin").first()
    yoga_class3 = Class.query.filter_by(type="Hatha").first()
    yoga_class4 = Class.query.filter_by(type="Vinyasa").first()
    yoga_class5 = Class.query.filter_by(type="Meditation").first()
    yoga_class6 = Class.query.filter_by(type="Yoga Nidra").first()
    yoga_class7 = Class.query.filter_by(type="Restorative").first()



    review1 = Review(
        user=user1,
        classes=yoga_class1,
        comment="Hardest class I've ever taken, but Amy is a great teacher and made me want to do great!"
    )
    review2 = Review(
        user=user1,
        classes=yoga_class2,
        comment="Challenging stretches, but oh so worth it!!!!"
    )
    review3 = Review(
        user=user1,
        classes=yoga_class3,
        comment="Love Cass, love this class :-)"
    )
    review4 = Review(
        user=user1,
        classes=yoga_class4,
        comment="Mary, Mary - whew...got so sweaty, but great class!!"
    )
    review5 = Review(
        user=user1,
        classes=yoga_class5,
        comment="I need to meditate more...I kept thinking about my lunch and the shoes I wore last Thursday."
    )
    review6 = Review(
        user=user1,
        classes=yoga_class6,
        comment="I fell asleep...is that what I was supposed to do?"
    )
    review7 = Review(
        user=user1,
        classes=yoga_class7,
        comment="Best use of a pillow, child's pose was amazing."
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.commit()


def undo_review():
    db.session.execute("TRUNCATE reviews CASCADE;")
    db.session.commit()