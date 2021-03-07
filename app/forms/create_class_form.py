from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Class


class CreateClassForm(FlaskForm):
    location_id = IntegerField("location_id", 
        validators=[DataRequired(message="Must associate a location.")])
    user_id = IntegerField("location_id", 
        validators=[DataRequired(message="Must associate a teacher.")])
    name = StringField("name", 
        validators=[DataRequired(message="Must provide a class name.")])
    type = StringField("type", 
        validators=[DataRequired(message="Must specify class type.")])
    class_image = StringField("imageURL", 
        validators=[DataRequired(message="Must upload an image."),])
    time = DateTimeField("time", 
        validators=[DataRequired(message="Must provide a class date and time.")])
    description = StringField("description", 
        validators=[DataRequired(message="Must include class description."),])
    price = IntegerField("price", 
        validators=[DataRequired(message="Must include class price.")])
