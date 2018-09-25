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

app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_DATABASE_URI'] = SQLALCHEMY_DATABASE_URI


Base = declarative_base()
db = SQLAlchemy(app)

class User(UserMixin, db.Model):
    """
    Тип освіти(вища, неповна вища,..) підтягнутий з бази 1с
    """
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    surname = db.Column(db.String(100))
    name = db.Column(db.String(100))
    email = db.Column(db.String(150), default=None)
    birthday = db.Column(db.DateTime, default=None)
    phone = db.Column(db.String(20), default=None)
    type = db.Column(db.String(50))
    login = db.Column(db.String(50))
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