from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, User, Message
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CreateMessageForm

message_routes = Blueprint("messages", __name__)


@message_routes.route("")
@login_required
def get_messages():
    messages = Message.query.all()
    return {"messages": [message.to_dict() for message in messages]}


# @message_routes.route("/<int:message_id>")
# @login_required
# def one_message(message_id):
#     message = Message.query.get(message_id)
#     return {"messages": [message.to_dict()]}


@message_routes.route("", methods=["POST"])
@login_required
def compose_message():
    form = CreateMessageForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_message = Message(
            sender_id=form.data["sender_id"],
            receiver_id=form.data["receiver_id"],
            message=form.data["message"],
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)}


@message_routes.route("/<int:message_id>", methods=["PUT", "DELETE"])
@login_required
def edit_message(message_id):
    message = Message.query.get(message_id)
    if request.method == "PUT":
        form = CreateMessageForm()
        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate_on_submit():
            form.populate_obj(message)
            db.session.add(message)
            db.session.commit()
            return message.to_dict()
        return {"errors": validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        db.session.delete(message)
        db.session.commit()
        return {"message": "Message Deleted."}