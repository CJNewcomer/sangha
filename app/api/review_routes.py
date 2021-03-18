from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Class, Review, user_classes


review_routes = Blueprint("reviews", __name__)


@review_routes.route("/")
@login_required
def reviews():
    reviews = Review.query.all()
    return {"reviews": [reviews.to_dict() for review in reviews]}


@review_routes.route("/<int:id>")
@login_required
def review(id):
    review = Review.query.get(id)
    return review.to_dict()


@review_routes.route("/")