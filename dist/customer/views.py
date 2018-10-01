from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, Customer, CustomerSchema


customer = Blueprint('customer', __name__)

@customer.route('/customer/list', methods=['GET'])
@login_required
def customer_list():
    record = db.session.query(Customer).all()
    converter = CustomerSchema(many=True, exclude=['orders'])
    customers = converter.dump(record).data
    return jsonify(customers)


@customer.route('/customer/add', methods=['POST'])
@login_required
def customer_add():
    customer = Customer(**request.json)
    db.session.add(customer)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer/update/<_id>', methods=['PUT'])
@login_required
def customer_update(_id):
    data = request.json
    db.session.query(Customer).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@customer.route('/customer/delete/<_id>', methods=['DELETE'])
@login_required
def customer_delete(_id):
    db.session.query(Customer).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
