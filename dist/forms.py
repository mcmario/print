from flask_wtf import FlaskForm
from wtforms import PasswordField, StringField
from wtforms.validators import DataRequired
from wtforms import validators

class LoginForm(FlaskForm):
    login = StringField('', [validators.DataRequired()], render_kw={"placeholder": "Ваш логін"})
    password = PasswordField('', validators=[DataRequired()], render_kw={"placeholder": "Ваш пароль"})
