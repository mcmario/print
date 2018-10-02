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
        return "{id=%s, surname='%s', name='%s', middlename='%s', email='%s', birthday='%s', phone='%s', type='%s'}" % (
            self.id, self.surname, self.name, self.middlename, self.email, self.birthday, self.phone, self.type)


class Printing(db.Model):
    """
    Друкарні
    """
    __tablename__ = 'printing'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))

    def __repr__(self):
        return "{id=%sname='%s'}" % (self.id, self.name)


class Client_type(db.Model):
    """
    Клієнти
    """
    __tablename__ = 'client_types'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))

    def __repr__(self):
        return "{id=%s,  name='%s'}" % (self.id, self.name)


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
    company = db.Column(db.String(200))
    comment = db.Column(db.Text)

    fk_client_type = db.Column(db.Integer, db.ForeignKey(Client_type.id), index=True)
    client_type = relationship(Client_type, backref=backref('сustomers', uselist=True, cascade='delete,all'))

    def __repr__(self):
        return "{id=%s, surname='%s', name='%s', middlename='%s', email='%s', company='%s', phone='%s', type='%s', comment='%s', fk_client_type='%s'}" % (
            self.id, self.surname, self.name, self.middlename, self.email, self.company, self.phone, self.type,
            self.comment, self.fk_client_type)


class Material(db.Model):
    """
    Матеріали
    """
    __tablename__ = 'marerials'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    dimension = db.Column(db.String(150))
    available = db.Column(db.Boolean, default=True)
    units = db.Column(db.String(100), default='м.кв')

    def __repr__(self):
        return "{id=%s, name='%s', dimension='%s', available='%s', units='%s'}" % (
        self.id, self.name, self.dimension, self.available, self.units)


class Price(db.Model):
    """
    Матеріали
    """
    __tablename__ = 'prices'
    id = db.Column(db.Integer, primary_key=True)
    price1 = db.Column(db.Integer)
    price2 = db.Column(db.Integer)
    delimiter = db.Column(db.Integer)

    fk_material = db.Column(db.Integer, db.ForeignKey(Material.id), index=True)
    fk_client_type = db.Column(db.Integer, db.ForeignKey(Client_type.id), index=True)
    material = relationship(Material, backref=backref('prices', uselist=True, cascade='delete,all'))
    client_type = relationship(Client_type, backref=backref('prices', uselist=True, cascade='delete,all'))

    def __repr__(self):
        return "{id=%s, price1='%s', price2='%s', delimiter='%s', fk_material='%s', fk_client_type='%s'}" % (
        self.id, self.price1, self.price2, self.delimiter, self.fk_material, self.fk_client_type)


class Order(db.Model):
    """
    Таблиця з замовленнями
    """
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    delivery_type = db.Column(db.String(100))
    address = db.Column(db.String(250))
    payment = db.Column(db.Boolean)
    status = db.Column(db.String(100))
    comment = db.Column(db.Text, default=None)
    date_created = db.Column(db.DateTime, default=datetime.now)
    approximate_date = db.Column(db.DateTime, default=None)
    date_finish = db.Column(db.DateTime, default=None)
    total = db.Column(db.Float)

    fk_user = db.Column(db.Integer, db.ForeignKey(User.id), index=True)
    fk_customer = db.Column(db.Integer, db.ForeignKey(Customer.id), index=True)
    fk_printing = db.Column(db.Integer, db.ForeignKey(Printing.id), index=True)
    user = relationship(User, backref=backref('orders', uselist=True, cascade='delete,all'))
    printing = relationship(Printing, backref=backref('orders', uselist=True, cascade='delete,all'))
    customer = relationship(Customer, backref=backref('orders', uselist=True, cascade='delete,all'))

    def __repr__(self):
        return "{id=%s, delivery_type='%s', address='%s', payment='%s', status='%s', comment='%s', date_created='%s', approximate_datee='%s', date_finish='%s', total='%s', fk_user='%s', fk_customer='%s', fk_printing='%s'}" % (
            self.id, self.delivery_type, self.address, self.payment, self.status, self.comment, self.date_created,
            self.approximate_date, self.date_finish, self.total, self.fk_user, self.fk_customer, self.fk_printing)


class Order_element(db.Model):
    """
    Таблиця з замовленнями
    """
    __tablename__ = 'order_elements'
    id = db.Column(db.Integer, primary_key=True)
    height = db.Column(db.Integer, default=None)
    width = db.Column(db.Integer, default=None)
    count = db.Column(db.Integer)
    price = db.Column(db.Integer)
    comment = db.Column(db.Text, default=None)
    luvers = db.Column(db.Boolean, default=False)
    step = db.Column(db.Integer, default=0)

    fk_material = db.Column(db.Integer, db.ForeignKey(Material.id), index=True)
    fk_order = db.Column(db.Integer, db.ForeignKey(Order.id), index=True)
    material = relationship(Material, backref=backref('order_elements', uselist=True, cascade='delete,all'))
    order = relationship(Order, backref=backref('order_elements', uselist=True, cascade='delete,all'))

    def __repr__(self):
        return "{id=%s, height='%s', width='%s', count='%s', price='%s', comment='%s', luvers='%s', type='%s', fk_material='%s', fk_order='%s'}" % (
            self.id, self.height, self.width, self.count, self.price, self.comment, self.luvers, self.step,
            self.fk_material, self.fk_order)


class SQLAlchemyUtilsConverter(ModelConverter):
    SQLA_TYPE_MAPPING = dict(list(ModelConverter.SQLA_TYPE_MAPPING.items()) + [(NullType, fields.Raw)])


class UserSchema(ModelSchema):
    class Meta:
        model = User
        model_converter = SQLAlchemyUtilsConverter

class MaterialSchema(ModelSchema):
    class Meta:
        model = Material
        model_converter = SQLAlchemyUtilsConverter


class Client_typeSchema(ModelSchema):
    class Meta:
        model = Client_type
        model_converter = SQLAlchemyUtilsConverter


class CustomerSchema(ModelSchema):
    client_type = fields.Nested(Client_typeSchema)

    class Meta:
        model = Customer
        model_converter = SQLAlchemyUtilsConverter

class PriceSchema(ModelSchema):
    material = fields.Nested(MaterialSchema)
    client_type = fields.Nested(Client_typeSchema)

    class Meta:
        model = Price
        model_converter = SQLAlchemyUtilsConverter


class PrintingSchema(ModelSchema):
    class Meta:
        model = Printing
        model_converter = SQLAlchemyUtilsConverter


class OrderSchema(ModelSchema):
    user = fields.Nested(UserSchema)
    printing = fields.Nested(PrintingSchema)
    customer = fields.Nested(CustomerSchema)

    # date_created = fields.Date('%Y-%m-%d')
    # approximate_date = fields.Date('%Y-%m-%d')
    # date_finish = fields.Date('%Y-%m-%d')
    class Meta:
        model = Order
        model_converter = SQLAlchemyUtilsConverter


class Order_elementSchema(ModelSchema):
    # order = fields.Nested(OrderSchema)
    class Meta:
        model = Order_element
        model_converter = SQLAlchemyUtilsConverter
