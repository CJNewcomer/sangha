import re
import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Class, user_classes
from werkzeug.utils import secure_filename
from app.api.auth_routes import validation_errors_to_error_messages
from app.config import Config
from app.helpers import upload_file_to_s3
from app.forms import SignUpForm


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


@user_routes.route('/<int:id>', methods=["POST"])
@login_required
def user_add_profile_image(id):
    user = User.query.get(id)
    form = SignUpForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image_error = []
    image = request.files.get("image", None)

    if image != None:
        image.filename = secure_filename(image.filename)
        pattern = re.compile(
            ".*(apng|avif|jpe?g|png|svg|webp)$", re.IGNORECASE)
        is_image = bool(pattern.match(image.mimetype))
        if not is_image:
            image_error.append(
                "Upload must be an image (apng, avif, jpeg/jpg, png, svg, webp)."
            )

    if form.validate_on_submit() and not image_error:

        url = ''
        if request.files:
            url = upload_file_to_s3(request.files['image'], Config.S3_BUCKET)
        
        new_profile_image = User(
            profile_image=url or "https://sangha.s3.us-east-2.amazonaws.com/Default_profile_image.png"
        )
        db.session.add(new_profile_image)
        db.session.commit()
        return new_profile_image.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    errors += image_error

    return {"errors": errors}


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
