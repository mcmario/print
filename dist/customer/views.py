from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, Customer, CustomerSchema, Client_type, Client_typeSchema
from app import login_required_admin, login_required_manager

customer = Blueprint('customer', __name__)


@customer.route('/customer/list', methods=['GET'])
@login_required
@login_required_manager()
def customer_list():
    record = db.session.query(Customer).all()
    converter = CustomerSchema(many=True,
                               only=['id', 'comment', 'company', 'email', 'middlename', 'name', 'phone', 'surname',
                                     'fk_client_type'])
    customers = converter.dump(record).data
    return jsonify(customers)


@customer.route('/customer/add', methods=['POST'])
@login_required
@login_required_manager()
def customer_add():
    customer = Customer(**request.json)
    db.session.add(customer)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer/update/<_id>', methods=['PUT'])
@login_required
@login_required_manager()
def customer_update(_id):
    data = request.json
    db.session.query(Customer).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_admin()
def customer_delete(_id):
    db.session.query(Customer).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer_type/list', methods=['GET'])
@login_required
@login_required_manager()
def customer_type_list():
    record = db.session.query(Client_type).all()
    converter = Client_typeSchema(many=True, exclude=['prices'])
    customers = converter.dump(record).data
    return jsonify(customers)


@customer.route('/customer_type/add', methods=['POST'])
@login_required
@login_required_admin()
def customer_type_add():
    type = Client_type(**request.data)
    db.session.add(type)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer_type/update/<_id>', methods=['PUT'])
@login_required
@login_required_admin()
def customer_type_update(_id):
    data = request.data
    db.session.query(Client_type).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer_type/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_admin()
def customer_type_delete(_id):
    db.session.query(Client_type).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
