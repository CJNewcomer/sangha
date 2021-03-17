from app.models import db, Class, User, Location


def seed_class():

    user2 = User.query.filter_by(username="yogiAmy").first()
    user3 = User.query.filter_by(username="yogiMichelle").first()
    user4 = User.query.filter_by(username="yogiCassidy").first()
    user5 = User.query.filter_by(username="yogiMary").first()
    user6 = User.query.filter_by(username="yogiDebbie").first()
    user7 = User.query.filter_by(username="yogiChelsea").first()
    user8 = User.query.filter_by(username="yogiCandace").first()
    user9 = User.query.filter_by(username="yogiEmily").first()


    short_form = Class(
        location_id=1,
        teacher=user2,
        name="Short Form Ashtanga",
        type="Ashtanga",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/katie-bush-XUyYBfsvCec-unsplash.jpg",
        location="Both",
        date="2021-04-01",
        time="2021-04-01 09:00 AM",
        description="60 minute class focused on breath and movement, for beginners and experts, designed to build strength and flexibility. Cues given in both Sanskrit and English.",
        price=10,
    )
    yin = Class(
        location_id=2,
        teacher=user3,
        name="Yin 60",
        type="Yin",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/sriyoga-ashram-QgCl-pNkfPc-unsplash.jpg",
        location="Both",
        date="2021-04-03",
        time="2021-04-03 10:00 AM",
        description="60 minute class, gentle and relaxing for all levels, meditative practice holding passive poses, using mindful muscle relaxtion. Targets the connective tissue nourishing joins, ligaments, and fascia.",
        price=12,
    )
    hatha = Class(
        location_id=3,
        teacher=user4,
        name="Hatha Yoga with Cass",
        type="Hatha",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/anupam-mahapatra-Vz0RbclzG_w-unsplash.jpg",
        location="In-Person",
        date="2021-04-02",
        time="2021-04-02 11:00 AM",
        description="60 minute class designed for all levels, sustained poses with attention to alignment.",
        price=10,
    )
    vinyasa = Class(
        location_id=4,
        teacher=user5,
        name="Vinyasa Flow with Mary",
        type="Vinyasa",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/rishikesh-yogpeeth-Isf-5rBPiIs-unsplash.jpg",
        location="Both",
        date="2021-03-31",
        time="2021-03-31 06:00 PM",
        description="60 minutes of flow that will energize, stretch, and strengthen your body, your will, and your confidence.",
        price=15,
    )
    meditation = Class(
        location_id=5,
        teacher=user6,
        name="Meditation Workshop",
        type="Meditation",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/close-up-woman-meditating-indoors.jpg",
        location="Both",
        date="2021-03-28",
        time="2021-03-28 11:00 AM",
        description="2 hour workshop that will guide you through the basics of meditation and how to develop a practice of your own.",
        price=35,
    )
    yoga_nidra = Class(
        location_id=6,
        teacher=user7,
        name="Yoga Nidra",
        type="Yoga Nidra",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/yoga_nidra.png",
        location="Virtual",
        date="2021-04-20",
        time="2021-04-20 08:00 PM",
        description="Restorative guided meditation, practiced in savasana (laying on back), 45 minutes.",
        price=18,
    )
    mommy_to_be = Class(
        location_id=7,
        teacher=user8,
        name="Mommy-to-be Yoga",
        type="Prenatal",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/Screen+Shot+2021-03-09+at+12.42.51+PM.png",
        location="Both",
        date="2021-04-03",
        time="2021-04-03 09:00 AM",
        description="60 minute class devoted to teaching strength and stamina, as well as concentration and breath control, all of which aids in labor and birth.",
        price=18,
    )
    restorative = Class(
        location_id=8,
        teacher=user9,
        name="Restorative Yoga",
        type="Restorative",
        class_image="https://sangha.s3.us-east-2.amazonaws.com/logan-weaver-MHX1XkQyZVE-unsplash.jpg",
        location="In-Person",
        date="2021-04-15",
        time="2021-04-15 12:00 PM",
        description="60 minute class focused on slowing down and opening your body through passive stretching through use of props for support.",
        price=21,
    )
   
    

    db.session.add(short_form)
    db.session.add(yin)
    db.session.add(hatha)
    db.session.add(vinyasa)
    db.session.add(meditation)
    db.session.add(yoga_nidra)
    db.session.add(mommy_to_be)
    db.session.add(restorative)
    db.session.commit()


def undo_class():
    db.session.execute("TRUNCATE classes CASCADE;")
    db.session.commit()
