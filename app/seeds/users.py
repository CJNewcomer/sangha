from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        User(
            username='Demo', 
            first_name='Demo',
            last_name='McDemo',
            email='demo@aa.io',
            is_teacher=False,
            password='password',
            ),
        User(
            username="yogiAmy",
            first_name="Amy",
            last_name="Cornflower",
            email="amy@amy.com",
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/amy.jpg",
            password='1234',
        ),
        User(
            username="yogiMichelle",
            first_name="Michelle",            
            last_name="Aquamarine",          
            email="michelle@michelle.com",            
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/michelle.jpg",
            password='1234',
        ),
        User(
            username="yogiCassidy",
            first_name="Cassidy",           
            last_name="Chartruese",            
            email="cass@cass.com",            
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/cassidy.jpg",
            password='1234',
        ),
        User(
            username="yogiMary",
            first_name="Mary",            
            last_name="Evergreen",            
            email="mary@mary.com",            
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/mary.jpg",
            password='1234',
        ),
        User(
            username="yogiDebbie",
            first_name="Debbie",            
            last_name="Rose",  
            email="debbie@debbie.com", 
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/debbie.jpg",
            password='1234',
        ),
        User(
            username="yogiChelsea",
            first_name="Chelsea",           
            last_name="Marigold",            
            email="chelsea@chelsea.com",           
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/chelsea.jpg",
            password='1234',
        ),
        User(
            username="yogiCandace",
            first_name="Candace",           
            last_name="Violet",           
            email="candace@candace.com",            
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/candace.jpg",
            password='1234',
        ),
        User(
            username="yogiEmily",
            first_name="Emily",            
            last_name="Sienna",          
            email="emily@emily.com",            
            is_teacher=True,
            profile_image="https://sangha.s3.us-east-2.amazonaws.com/emily.jpg",
            password='1234',
        ),
    ]
    db.session.bulk_save_objects(users)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
