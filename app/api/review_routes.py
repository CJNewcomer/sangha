from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.models import db, User, Class, Review, user_classes
from app.forms import CreateReviewForm


review_routes = Blueprint("reviews", __name__)


@review_routes.route("")
@login_required
def reviews():
    reviews = Review.query.all()
    return {"reviews": [reviews.to_dict() for review in reviews]}


@review_routes.route("/<review_id>")
@login_required
def one_review(review_id):
    review = Review.query.get(review_id)
    return jsonify({"reviews": [review.to_dict()]})


@review_routes.route("/new", methods=["POST"])
@login_required
def create_review():
    form = CreateReviewForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        review = Review()
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()
        return review.to_dict()
    
    return {"errors": validation_errors_to_error_messages(form.errors)}


@review_routes.route("/<review_id>", methods=["PUT", "DELETE"])
@login_required
def edit_review(review_id):
    review = Review.query.get(review_id)
    if request.method == "PUT":
        form = CreateReviewForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            form.populate_obj(review)
            db.session.add(review)
            db.session.commit()
            return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        review.body = "[DELETED]"
        db.session.commit()