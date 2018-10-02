from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, PriceSchema, Price


price = Blueprint('price', __name__)

@price.route('/price/list', methods=['GET'])
@login_required
def price_list():
    record = db.session.query(Price).all()
    converter = PriceSchema(many=True, exclude=['material', 'client_type.prices'])
    customers = converter.dump(record).data
    return jsonify(customers)

@price.route('/price/info/<_id>', methods=['GET'])
@login_required
def price_info(_id):
    record = db.session.query(Price).filter(Price.fk_client_type == _id).all()
    converter = PriceSchema(many=True, exclude=['client_type.prices', 'material.order_elements', 'material.prices'])
    price = converter.dump(record).data
    return jsonify(price)

@price.route('/price/info/<_id>/<material_id>', methods=['GET'])
@login_required
def price_info_material(_id, material_id):
    record = db.session.query(Price).filter(Price.fk_client_type == _id).filter(Price.fk_material == material_id).all()
    converter = PriceSchema(many=True, exclude=['client_type.prices', 'material.order_elements', 'material.prices'])
    price = converter.dump(record).data
    return jsonify(price)

@price.route('/price/add', methods=['POST'])
@login_required
def price_add():
    data = request.json
    for arg in data:
        price = Price(**arg)
        db.session.add(price)
    db.session.commit()
    return jsonify('ok')


@price.route('/price/update/<_id>', methods=['PUT'])
@login_required
def price_update(_id):
    data = request.json
    db.session.query(Price).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@price.route('/price/delete/<_id>', methods=['DELETE'])
@login_required
def price_delete(_id):
    db.session.query(Price).filter(Price.fk_client_type == _id).delete()
    db.session.commit()
    return jsonify('ok')
