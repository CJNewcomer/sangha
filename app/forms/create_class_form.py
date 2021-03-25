from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TimeField, SelectField, DateField
from wtforms.validators import DataRequired, InputRequired, ValidationError
from app.models import Class


def class_city_check(form, field):
    if (field.data == 'In-Person' or 'In-Person & Virtual'):
        raise ValidationError("Must include city.")

def class_state_check(form, field):
    if (field.data == 'In-Person' or 'In-Person & Virtual'):
        raise ValidationError("Must include state.")

def class_country_check(form, field):
    if (field.data == 'In-Person' or 'In-Person & Virtual'):
        raise ValidationError("Must include country.")



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
        'In-Person / Virtual'
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
        validators=[InputRequired(), class_city_check])
    state = StringField("state", 
        validators=[InputRequired(), class_state_check])
    country = StringField("country", 
        validators=[InputRequired(), class_country_check])
