from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired, ValidationError
from app.models import Review


class CreateReviewForm(FlaskForm):
    user_id = IntegerField("user_id", 
    validators=[DataRequired(message='Must associate a user.')])
    class_id = IntegerField("class_id",
    validators=[DataRequired(message='Must associate a class.')])
    comment = StringField("comment", 
    validators=[DataRequired(message='Must include a message.')])
    
