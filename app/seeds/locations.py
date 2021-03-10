from app.models import db, Class, Location


def seed_locations():

    memphis = Location(
        id=1,
        long=-90.048981,
        lat=35.149532,
        city="Memphis",
        state="TN",
        country="United States"
    )
    denver = Location(
        id=2,
        long=-104.990250,
        lat=39.739235,
        city="Denver",
        state="CO",
        country="United States"
    )
    manchester = Location(
        id=3,
        long=-71.454391,
        lat=43.008663,
        city="Manchester",
        state="NH",
        country="United States"
    )
    new_york_city = Location(
        id=4,
        long=-73.935242,
        lat=40.730610,
        city="New York City",
        state="NY",
        country="United States"
    )
    portland = Location(
        id=5,
        long=-122.679565,
        lat=45.512794,
        city="Portland",
        state="OR",
        country="United States"
    )
    phoenix= Location(
        id=6,
        long=-112.074036,
        lat=33.448376,
        city="Phoenix",
        state="AZ",
        country="United States"
    )
    houston = Location(
        id=7,
        long=-95.358421,
        lat=29.749907,
        city="Houston",
        state="TX",
        country="United States"
    )
    las_vegas = Location(
        id=8,
        long=-115.172813,
        lat=36.114647,
        city="Las Vegas",
        state="NV",
        country="United States"
    )

    db.session.add(memphis)
    db.session.add(denver)
    db.session.add(manchester)
    db.session.add(new_york_city)
    db.session.add(portland)
    db.session.add(phoenix)
    db.session.add(houston)
    db.session.add(las_vegas)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_locations():
    db.session.execute('TRUNCATE locations RESTART IDENTITY CASCADE;')
    db.session.commit()

