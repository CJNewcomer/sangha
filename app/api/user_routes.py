from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Class


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# POST route that needs to grab a single class by id on onClick event and store within user 
@user_routes.route('/<int:id>/myclasses', methods=["POST"])
@login_required
def book_class(user_id, class_id):
    user = User.query.get(user_id)
    