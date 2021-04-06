import re
import boto3
import botocore
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Class, Review, user_classes
from werkzeug.utils import secure_filename
from app.api.auth_routes import validation_errors_to_error_messages
from app.config import Config
from app.helpers import upload_file_to_s3


user_routes = Blueprint('users', __name__)


@user_routes.route('/')
# @login_required
def get_users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def get_user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/profilepic', methods=["PUT"])
@login_required
def user_add_profile_image(id):
    user = User.query.get(id)

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

    if not image_error:

        url = "https://sangha.s3.us-east-2.amazonaws.com/Default_profile_image.png"
        if image:
            url = upload_file_to_s3(image, Config.S3_BUCKET)
        
        user.profile_image = url
     
        db.session.commit()
        return user.to_dict()

    errors = image_error
    print("errors", errors)
    return {"errors": errors}
    

# POST route that needs to grab a single class by id on onClick event and store within user 
@user_routes.route('/<int:id>/classes/<int:class_id>', methods=["POST"])
@login_required
def book_class(id, class_id):
    if current_user.id is not id:
        return {"enrolled": False}
    yoga_class = Class.query.get(class_id)
    if current_user not in yoga_class.student:
        yoga_class.student.append(current_user)
        db.session.commit()
        return yoga_class.to_dict()
    return {"errors": "Already registered for this class."}

@user_routes.route('/<int:id>/classes/<int:class_id>', methods=["PUT"])
@login_required
def cancel_class(id, class_id):
    if current_user.id is not id:
        return {"enrolled": False}
    yoga_class = Class.query.get(class_id)
    if current_user in yoga_class.student:
        yoga_class.student.remove(current_user)
        db.session.commit()
        return yoga_class.to_dict()
    return {"errors": "You are not registered for this class."}