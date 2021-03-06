import boto3
import botocore
from flask import Blueprint, request
from flask_login import login_required

from app.config import Config
from app.helpers import upload_file_to_s3
from app.models import db, Class
from app.forms import CreateClassForm


class_routes = Blueprint('class', __name__)



@class_routes.route("")
def get_classes():
    classes = Class.query.all()
    return {"classes": [class.to_dict() for class in classes]}


@class_routes.route("", methods=["POST"])
@login_required
def create_pet():
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

        output_link = (
            upload_file_to_s3(image)
            if image
            else "https://sangha.s3.us-east-2.amazonaws.com/erik-brolin-ZARfCYDaVg0-unsplash.jpg"
        )

        new_class = Class(

        )

