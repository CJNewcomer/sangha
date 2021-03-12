from flask import Blueprint
from app.models import db, Class


search_routes = Blueprint("search", __name__)


@search_routes.route("")
def search_classes():
    yoga_classes = Class.query.all()
    return {"yoga_classes": [yoga_class.to_dict() for yoga_class in yoga_classes]}