from flask import Flask
import flask_sqlalchemy
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, backref
from datetime import datetime
from sqlalchemy.dialects.mysql import MEDIUMBLOB
from config import SQLALCHEMY_DATABASE_URI
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask.ext.login import UserMixin
from marshmallow import fields
from marshmallow_sqlalchemy import ModelSchema, ModelConverter
from sqlalchemy.sql.sqltypes import NullType

app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI


Base = declarative_base()
db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    """
    Користувачі
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    surname = db.Column(db.String(100))
    name = db.Column(db.String(100))
    middlename = db.Column(db.String(100), default=None)
    email = db.Column(db.String(150), default=None)
    birthday = db.Column(db.DateTime, default=None)
    phone = db.Column(db.String(100), default=None)
    type = db.Column(db.String(50))
    login = db.Column(db.String(50), unique=True)
    password = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))

    @property
    def password(self):
        raise AttributeError('password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return "{id=%s, surname='%s', name='%s'}" % (self.id, self.surname, self.name)

class Printing(db.Model):
    """
    Друкарні
    """
    __tablename__ = 'printing'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))

class Customer(db.Model):
    """
    Клієнти
    """
    __tablename__ = 'сustomers'
    id = db.Column(db.Integer, primary_key=True)
    surname = db.Column(db.String(100))
    name = db.Column(db.String(100))
    middlename = db.Column(db.String(100), default=None)
    email = db.Column(db.String(150), default=None)
    phone = db.Column(db.String(100), default=None)
    type = db.Column(db.String(50))
    company = db.Column(db.String(200))
    comment = db.Column(db.Text)

class Material(db.Model):
    """
    Матеріали
    """
    __tablename__ = 'marerials'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    dimension = db.Column(db.String(150))
    available = db.Column(db.Boolean, default=True)




class SQLAlchemyUtilsConverter(ModelConverter):
    SQLA_TYPE_MAPPING = dict(list(ModelConverter.SQLA_TYPE_MAPPING.items()) + [(NullType, fields.Raw)])


class UserSchema(ModelSchema):
    class Meta:
        model = User
        model_converter = SQLAlchemyUtilsConverter
