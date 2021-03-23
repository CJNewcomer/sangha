from flask.cli import AppGroup
from .users import seed_users, undo_users
from .locations import seed_locations, undo_locations
from .classes import seed_class, undo_class
from .reviews import seed_review, undo_review

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_locations()
    seed_users()
    seed_class()
    seed_review()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_locations()
    undo_users()
    undo_class()
    undo_review()
    # Add other undo functions here
