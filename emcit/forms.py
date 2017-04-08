from flask_wtf import Form
from flask_wtf.csrf import CsrfProtect
from wtforms import (
    IntegerField, PasswordField, SelectField,
    SelectMultipleField, TextAreaField, TextField,
    ValidationError
)
from wtforms.validators import DataRequired, Email, Length


USER_ROLES = [
    ('reporter', 'REPORTER'), ('analyst', 'ANALYST'), ('admin', 'ADMIN')
]

user_name_field = TextField(
    'Name',
    validators=[DataRequired(), Length(max=255)]
)
user_organization_field = TextField(
    'Organization',
    validators=[DataRequired(), Length(max=255)]
)
user_email_feild = TextField(
    'Email Address',
    validators=[DataRequired(), Email(message=None), Length(min=6, max=255)]
)

user_phone_number_field = TextField(
    'Phone Number',
    validators=[DataRequired(), Length(min=10)]
)

user_password_field = PasswordField(
    'Password',
    validators=[DataRequired(), Length(min=2, max=25)]
)

class BaseUserForm(Form):
    """
    Creates a form that requires an email,
    password, phone number, and checked boxes.

    """
    name = user_name_field
    organization = user_organization_field
    email = user_email_feild
    phone_number = user_phone_number_field
    role = SelectField('User Role', choices=USER_ROLES)
    services = service_field

    def __init__(self, *args, **kwargs):
        super(BaseUserForm, self).__init__(*args, **kwargs)
        self.services.choices = [
            (service.id, service.name) for service in Service.all()
        ]
        self.validate_unique_email = kwargs.get('validate_unique_email', True)

    def validate_email(self, field):
        if self.validate_unique_email and User.get_by_email(field.data):
            raise ValidationError('This email is already in use.')

class FullUserForm(BaseUserForm):
    password = user_password_field

class LoginForm(Form):
    email = TextField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
