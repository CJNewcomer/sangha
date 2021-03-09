from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TimeField, SelectField, DateField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from app.models import Class


class CreateClassForm(FlaskForm):
    user_id = IntegerField("user_id", 
        validators=[DataRequired(message="Must associate a teacher.")])
    name = StringField("name", 
        validators=[DataRequired(message="Must provide a class name.")])
    type = SelectField("type", choices=[
        'Ashtanga', 
        'Hatha', 
        'Meditation', 
        'Prenatal',
        'Restorative',
        'Vinyasa',
        'Yin',
        'Yoga Nidra'
        ], 
        validators=[DataRequired(message="Must specify class type.")])
    class_image = StringField("class_image", 
        validators=[DataRequired(message="Must upload an image."),])
    location = SelectField("location", choices=[
        'In-Person',
        'Virtual',
        'Both'
    ],
        validators=[DataRequired(message="Must specify a location."),])
    date = DateField("date", 
        validators=[DataRequired(message="Must provide a class date.")])
    time = TimeField("time",
        validators=[DataRequired(message="Must provide a class time.")])
    description = StringField("description", 
        validators=[DataRequired(message="Must include class description."),])
    price = IntegerField("price", 
        validators=[DataRequired(message="Must include class price.")])
    city = StringField("city", 
        validators=[DataRequired(message="Must include city."),])
    state = StringField("state", 
        validators=[DataRequired(message="Must include state."),])
    country = StringField("country", 
        validators=[DataRequired(message="Must include country."),])
