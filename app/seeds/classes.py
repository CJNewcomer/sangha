from app.models import db, Class, User


def seed_class():

    user1 = User.query.filter_by(username="Courtney").first()
    user2 = User.query.filter_by(username="Michelle").first()
    user3 = User.query.filter_by(username="Cassidy").first()
    user4 = User.query.filter_by(username="Mary").first()
    user5 = User.query.filter_by(username="Debbie").first()
    user6 = User.query.filter_by(username="Chelsea").first()
    user7 = User.query.filter_by(username="Candace").first()
    user8 = User.query.filter_by(username="Emily").first()


    short_form = Class(
        teacher=user1,
        name="Short Form Ashtanga",
        type="Ashtanga",
        class_image="",
        location="Both",
        date="2021-04-01 00:00",
        time="2021-04-01 09:00 AM",
        description="60 minute class focused on breath and movement, for beginners and experts, designed to build strength and flexibility. Cues given in both Sanskrit and English.",
        price=10,
        city="Memphis",
        state="TN",
        country="United States"
    )
    yin = Class(
        teacher=user2,
        name="Yin 60",
        type="Yin",
        class_image="",
        location="Both",
        date="2021-04-03 00:00",
        time="2021-04-03 10:00 AM",
        description="60 minute class, gentle and relaxing for all levels, meditative practice holding passive poses, using mindful muscle relaxtion. Targets the connective tissue nourishing joins, ligaments, and fascia.",
        price=12,
        city="Denver",
        state="CO",
        country="United States"
    )
    hatha = Class(
        teacher=user3,
        name="Hatha Yoga with Cass",
        type="Hatha",
        class_image="",
        location="In-Person",
        date="2021-04-02 00:00",
        time="2021-04-02 11:00 AM",
        description="60 minute class designed for all levels, sustained poses with attention to alignment.",
        price=10,
        city="St. Louis",
        state="MO",
        country="United States"
    )
    mommy_to_be = Class(
        teacher=user7,
        name="Mommy-to-be Yoga",
        type="Prenatal",
        class_image="",
        location="Both",
        date="2021-04-03 00:00",
        time="2021-04-03 09:00 AM",
        description="60 minute class devoted to teaching strength and stamina, as well as concentration and breath control, all of which aids in labor and birth.",
        price=18,
        city="Jackson",
        state="MS",
        country="United States"
    )
    meditation = Class(
        teacher=user5,
        name="Meditation Workshop",
        type="Meditation",
        class_image="",
        location="Both",
        date="2021-03-28 00:00",
        time="2021-03-28 11:00 AM",
        description="2 hour workshop that will guide you through the basics of meditation and how to develop a practice of your own.",
        price=35,
        city="Portland",
        state="OR",
        country="United States"
    )
    restorative = Class(
        teacher=user8,
        name="Restorative Yoga",
        type="Restorative",
        class_image="",
        location="In-Person",
        date="2021-04-15 00:00",
        time="2021-04-15 12:00 PM",
        description="60 minute class focused on slowing down and opening your body through passive stretching through use of props for support.",
        price=21,
        city="Las Vegas",
        state="NV",
        country="United States"
    )
    vinyasa = Class(
        teacher=user4,
        name="Vinyasa Flow with Mary",
        type="Vinyasa",
        class_image="",
        location="Both",
        date="2021-03-31 00:00",
        time="2021-03-31 06:00 PM",
        description="60 minutes of flow that will energize, stretch, and strengthen your body, your will, and your confidence.",
        price=15,
        city="New York City",
        state="NY",
        country="United States"
    )
    yoga_nidra = Class(
        teacher=user6,
        name="Yoga Nidra",
        type="Yoga Nidra",
        class_image="",
        location="Virtual",
        date="2021-04-20 00:00",
        time="2021-04-20 08:00 PM",
        description="Restorative guided meditation, practiced in savasana (laying on back), 45 minutes.",
        price=14,
        city="Houston",
        state="TN",
        country="United States"
    )
   
    

    db.session.add(short_form)
    db.session.add(yin)
    db.session.add(hatha)
    db.session.add(mommy_to_be)
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.add()
    db.session.commit()


def undo_classes():
    db.session.execut("TRUNCATE classes CASCADE;")
    db.session.commit()
