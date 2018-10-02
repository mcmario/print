from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, Order, OrderSchema, Order_elementSchema, Order_element


order = Blueprint('order', __name__)


@order.route('/order/list/<status>', methods=['GET'])
@login_required
def order_list(status):
    record = db.session.query(Order).filter(Order.status == status).all()
    converter = OrderSchema(many=True,
                            only=['address', 'approximate_date', 'fk_user', 'delivery_type', 'id', 'payment', 'status',
                                  'comment', 'date_created', 'date_finish', 'total', 'fk_customer', 'fk_printing',
                                  'user.surname', 'user.name', 'printing.name', 'customer'])
    orders = converter.dump(record).data
    return jsonify(orders)


@order.route('/order/add', methods=['POST'])
@login_required
def order_add():
    order = Order(**request.json)
    db.session.add(order)
    db.session.commit()
    return jsonify(order.id)


@order.route('/order/info/<_id>', methods=['GET'])
@login_required
def order_info(_id):
    record = db.session.query(Order).filter(Order.id == _id).first()
    converter = OrderSchema(exclude=['order_elements'])
    orders = converter.dump(record).data
    records_element = db.session.query(Order_element).filter(Order_element.fk_order == _id).all()
    converter = Order_elementSchema(many=True)
    elements = converter.dump(records_element).data
    orders['element'] = elements
    return jsonify(orders)


@order.route('/order/update/<_id>', methods=['PUT'])
@login_required
def order_update(_id):
    data = request.json
    db.session.query(Order).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@order.route('/order/delete/<_id>', methods=['DELETE'])
@login_required
def order_delete(_id):
    db.session.query(Order).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')