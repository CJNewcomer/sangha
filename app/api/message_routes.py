from app.models import Message
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import CreateMessageForm

message_routes = Blueprint('message', __name__)


@message_routes.route("")
@login_required
def get_messages():
    messages = Message.query.all()
    return {"messages": [message.to_dict() for message in messages]}


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
    errors = validation_errors_to_error_messages(form.errors)
    return {"errors": errors}


@message_routes.route("/<int:message_id>", methods=["DELETE"])
@login_required
def delete_message(message_id):
    delete_this_message = Message.query.get(message_id)
    if delete_this_message:
        db.session.delete(delete_this_message)
        db.session.commit()
        return "Message deleted"
    else:
        return {"errors": "No message found with id given."}