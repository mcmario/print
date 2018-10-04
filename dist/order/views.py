from flask import Blueprint, jsonify, request
from datetime import datetime
from alchemybase import db, Order, OrderSchema, Order_elementSchema, Order_element
from app import login_required_manager, login_required_manager_change
from flask_login import login_required, current_user
from sqlalchemy import or_, and_, distinct, desc, asc

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
    data['order']['fk_user'] = current_user.get_id()
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


@order.route('/order/update/<_id>/<status>', methods=['PUT'])
@login_required
def order_update_status(_id, status):
    datenow = datetime.strftime(datetime.now(), "%Y-%m-%d")
    if status == 'finish':
        db.session.query(Order).filter_by(id=_id).update({Order.status: status, Order.date_finish: datenow})
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


@order.route('/order/filter/<status>/<payment>/<printing>/<customer>/<date_start>/<date_finish>', methods=['GET'])
@login_required
def order_filter(status, payment, printing, customer, date_start, date_finish):
    status = '%' if status == 'all' else status
    payment = '%' if payment == 'all' else payment
    printing = '%' if printing == 'all' else printing
    customer = '%' if customer == 'all' else customer
    date_start = '2018-01-01' if date_start == 'all' else date_start
    date_finish = datetime.strftime(datetime.now(), "%Y-%m-%d") if date_finish == 'all' else date_finish
    resp = db.session.query(distinct(Order.date_created)).order_by(desc(Order.date_created)).all()
    result = {}
    for arg in resp:
        d_create = datetime.strptime(str(arg[0])[0:10], "%Y-%m-%d").date()
        record = db.session.query(Order).filter(
            and_(Order.fk_customer.like(customer),
                 Order.fk_printing.like(printing),
                 Order.status.like(status),
                 Order.payment.like(payment))).filter(Order.date_created.between(date_start, date_finish)) \
            .filter(Order.date_created == d_create).all()
        converter = OrderSchema(many=True,
                                only=['address', 'approximate_date', 'fk_user', 'delivery_type', 'id', 'payment',
                                      'status',
                                      'comment', 'date_created', 'date_finish', 'total', 'fk_customer', 'fk_printing',
                                      'user.surname', 'user.name', 'printing.name', 'customer'],
                                exclude=['customer.client_type', 'customer.orders'])
        orders = converter.dump(record).data
        if orders:
            result[str(d_create)] = orders
    return jsonify(result)
