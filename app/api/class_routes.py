import re
import boto3
import botocore
from datetime import datetime
from flask import Blueprint, request
from flask_login import login_required
from werkzeug.utils import secure_filename
from app.api.auth_routes import validation_errors_to_error_messages
from app.config import Config
from app.helpers import upload_file_to_s3
from app.models import db, Class, Location
from app.forms import CreateClassForm


class_routes = Blueprint('class', __name__)



@class_routes.route("")
def get_classes():
    classes = Class.query.all()
    return {"classes": [classy.to_dict() for classy in classes]}


@class_routes.route("", methods=["POST"])
@login_required
def create_class():
    form = CreateClassForm()
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

        location = Location(
            city=form.data["city"],
            state=form.data["state"],
            country=form.data["country"]
        )
        db.session.add(location)
        db.session.commit()

        date_time = datetime.combine(form.data["date"],
        form.data["time"])

        # time_ = date_time.time()

        new_class = Class(
            location_id=location.id,
            user_id=form.data["user_id"],
            name=form.data["name"],
            type=form.data["type"],
            class_image=url or "https://sangha.s3.us-east-2.amazonaws.com/erik-brolin-ZARfCYDaVg0-unsplash.jpg",
            location=form.data["location"],
            date=form.data["date"],
            time=date_time,
            description=form.data["description"],
            price=form.data["price"],
        )
        db.session.add(new_class)
        db.session.commit()
        return new_class.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    errors += image_error

    return {"errors": errors}
    

@class_routes.route("/<class_id>", methods=['POST'])
@login_required
def update_class(class_id):
    """
    Update class
    """
    form = CreateClassForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    image_error = []
    image = request.files.get("image", None)

    class_to_update = Class.query.get(class_id)

    class_to_update.location_id = form.data["location_id"]
    class_to_update.user_id = form.data["user_id"]
    class_to_update.name = form.data["name"]
    class_to_update.type = form.data["type"]
    class_to_update.location = form.data["location"]
    class_to_update.class_image = form.data["class_image"]
    class_to_update.date = form.data["date"]
    class_to_update.time = form.data["time"]
    class_to_update.description = form.data["description"]
    class_to_update.price = form.data["price"]

    if image is not None:
        image.filename = secure_filename(image.filename)
        pattern = re.compile(
            ".*(apng|avif|jpe?g|png|svg|webp)$", re.IGNORECASE)
        is_image = bool(pattern.match(image.mimetype))
        if not is_image:
            image_error.append(
                "Upload must be an image (apng, avif, jpeg/jpg, png, svg, webp)."
            )

    if form.validate_on_submit() and not image_error:
        output_link = upload_file_to_s3(image) if image else None

        if output_link:
            class_to_update.class_image = output_link

        db.session.add(class_to_update)
        db.session.commit()
        return class_to_update.to_dict()

    errors = validation_errors_to_error_messages(form.errors)
    errors += image_error

    return {"errors": errors}

@class_routes.route("/<class_id>", methods=["DELETE"])
@login_required
def delete_class(class_id):
    """
    Delete a class
    """
    class_to_delete = Class.query.get(class_id)
    if class_to_delete:
        db.session.delete(class_to_delete)
        db.session.commit()
        return "Deleted"
    else:
        return {"errors": "No class found with provided id."}
