from flask import Blueprint, jsonify, request
from flask_login import login_required
from datetime import datetime
from alchemybase import db, Order, OrderSchema, Order_elementSchema, Order_element
from app import login_required_manager, login_required_manager_change


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
@login_required_manager()
def order_add():
    data = request.json
    if data['order']['approximate_date'] != '':
        data['order']['approximate_date'] = data['order']['approximate_date'][0:10]
    order = Order(**data['order'])
    db.session.add(order)
    db.session.flush()
    for arg in data['elements']:
        arg['fk_order'] = order.id
        element = Order_element(**arg)
        db.session.add(element)
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
@login_required_manager_change()
def order_update(_id):
    data = request.json
    if data['approximate_date'] != '':
        data['approximate_date'] = data['approximate_date'][0:10]
    db.session.query(Order).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')

@order.route('/order/update/<_id>/<status>', methods=['GET'])
@login_required
def order_update_status(_id, status):
    datenow = datetime.strftime(datetime.now(), "%Y-%m-%d")
    if status == 'finish':
        db.session.query(Order).filter_by(id=_id).update({Order.status: status, Order.date_finish:datenow})
    else:
        db.session.query(Order).filter_by(id=_id).update({Order.status: status})
    db.session.commit()
    return jsonify('ok')

@order.route('/order/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_manager_change()
def order_delete(_id):
    db.session.query(Order).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')

@order.route('/order_element/add', methods=['POST'])
@login_required
@login_required_manager()
def order_element_add():
    data = request.json
    order_element = Order_element(**data)
    db.session.add(order_element)
    db.session.commit()
    return jsonify('ok')


@order.route('/order_element/update/<_id>', methods=['PUT'])
@login_required
@login_required_manager()
def order_element_update(_id):
    data = request.json
    db.session.query(Order_element).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@order.route('/order_element/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_manager()
def order_element_delete(_id):
    db.session.query(Order_element).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
