from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TimeField, SelectField, DateField
from wtforms.validators import DataRequired, Length
from app.models import Message


class CreateMessageForm(FlaskForm):
    sender_id = IntegerField("sender_id", validators=[DataRequired()])
    receiver_id = IntegerField("receiver_id", validators=[DataRequired()])
    message = StringField("message",
        validators=[
            DataRequired(message="Message body cannot be empty."),
            Length(min=1, max=500, message="Must be less than 500 characters."),
        ],
    )