from app.models import db, Message, User


def seed_message():

    user1 = User.query.filter_by(username="Demo").first()
    user2 = User.query.filter_by(username="yogiAmy").first()
    user3 = User.query.filter_by(username="yogiMichelle").first()
    user4 = User.query.filter_by(username="yogiCassidy").first()
    user5 = User.query.filter_by(username="yogiMary").first()
    user6 = User.query.filter_by(username="yogiDebbie").first()
    user7 = User.query.filter_by(username="yogiChelsea").first()
    user8 = User.query.filter_by(username="yogiCandace").first()
    user9 = User.query.filter_by(username="yogiEmily").first()

    messages = [
        Message(
            sender_id=user1.id,
            receiver_id=user2.id,
            message="Ashtanga seems really hard. What should I know before I take your class?"
        ),
        Message(
            sender_id=user2.id,
            receiver_id=user1.id,
            message="All you need is your breath. My cues will lead you, beginner to advanced."
        ),
        Message(
            sender_id=user1.id,
            receiver_id=user3.id,
            message="I needed that Yin class, it really pushed me, but I felt great and aware afterwards."
        ),
        Message(
            sender_id=user3.id,
            receiver_id=user1.id,
            message="That is great to hear! I look forward to seeing you at my class next week! Be sure to book in advance for in-person."
        ),
        Message(
            sender_id=user1.id,
            receiver_id=user4.id,
            message="This class was interesting - I have never taken a class like this before. What else do you offer?"
        ),
        Message(
            sender_id=user4.id,
            receiver_id=user1.id,
            message="Right now, I am only teaching Hatha. If you need more fluidity in your practice, I suggest taking Mary's Vinyasa class."
        ),
        Message(
            sender_id=user1.id,
            receiver_id=user5.id,
            message="Oh my word. Your theme for this flow class resonated with me. How do I find out more?"
        ),
        Message(
            sender_id=user5.id,
            receiver_id=user1.id,
            message="Awwwww! Glad you loved it! My favorite book is 'The Alchemist' by Paulo Coelho and I draw a lot of inspiration from it."
        ),
        Message(
            sender_id=user1.id,
            receiver_id=user6.id,
            message="Should I go buy a singing bowl?"
        ),
        Message(
            sender_id=user6.id,
            receiver_id=user1.id,
            message="Only if you want to - you do not need anything but your breath to meditate."
            ),
        Message(
            sender_id=user1.id,
            receiver_id=user7.id,
            message="Am I going to fall asleep in this class? I hope I don't snore..."
        ),
        Message(
            sender_id=user7.id,
            receiver_id=user1.id,
            message="My cues will lead you to a relaxed state of consciousness that hovers just above sleeping."
            ),
        Message(
            sender_id=user1.id,
            receiver_id=user8.id,
            message="I may recommend one of my friends come to your class, because I'm not pregnant. Do you offer any other classes besides this one?"
        ),
        Message(
            sender_id=user8.id,
            receiver_id=user1.id,
            message="Oh, that would be great! I will offer a Yin class starting in May, so keep an eye out on the schedule!"
            ),
        Message(
            sender_id=user1.id,
            receiver_id=user9.id,
            message="I loved your message about the moon and stars. Where do you find this stuff?!?"
        ),
        Message(
            sender_id=user9.id,
            receiver_id=user1.id,
            message="Thank you. I am really into astrology. The Co-Star app is one of my favorites!"
            ),
    ]

    db.session.bulk_save_objects(messages)
    db.session.commit()


def undo_message():
    db.session.execute("TRUNCATE messages;")
    db.session.commit()
