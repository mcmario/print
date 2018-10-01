from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, Material, MaterialSchema


material = Blueprint('material', __name__)

@material.route('/material/list', methods=['GET'])
@login_required
def material_list():
    record = db.session.query(Material).all()
    converter = MaterialSchema(many=True, exclude=['order_elements'])
    materials = converter.dump(record).data
    return jsonify(materials)


@material.route('/material/add', methods=['POST'])
@login_required
def material_add():
    material = Material(**request.json)
    db.session.add(material)
    db.session.commit()
    return jsonify('ok')


@material.route('/material/update/<_id>', methods=['PUT'])
@login_required
def material_update(_id):
    data = request.json
    db.session.query(Material).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@material.route('/material/delete/<_id>', methods=['DELETE'])
@login_required
def material_delete(_id):
    db.session.query(Material).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
