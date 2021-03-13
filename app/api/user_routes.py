from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Class, user_classes


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


# @user_routes.route('/<int:id>/myclasses/<int:class_id>')
# @login_required
# def user_class(id, class_id):
#     if current_user.id is not id:
#        return {"enrolled": False}
#     yoga_class = Class.query.get(class_id)
#     return {"enrolled": any([student for student in yoga_class.student if student.id == current_user.id])}


# POST route that needs to grab a single class by id on onClick event and store within user 
@user_routes.route('/<int:id>/myclasses/<int:class_id>', methods=["POST"])
@login_required
def book_class(id, class_id):
    if current_user.id is not id:
        return {"enrolled": False}
    yoga_class = Class.query.get(class_id)
    if current_user not in yoga_class.student:
        yoga_class.student.append(current_user)
        db.session.commit()
        return {"message": "You are now registered for this class."}
    else:
        return {"errors": "Already registered for this class."}
   




# add user instance of object to instance of sql alchemy class
# instead of db.session.add - look up class through sqlalchemy by class id
# yoga_class.student.append{student}
# db.session.save() - force sql alchemy to store object
# class.student.append - db.session.add(yoga_class)
# b/c of back_populates create user_class and 
# pretend yoga_class is an array and students are added 
# user.attend_classes.push
