from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, Printing, PrintingSchema
from app import login_required_admin


printer = Blueprint('printer', __name__)

@printer.route('/printer/list', methods=['GET'])
@login_required
@login_required_admin()
def printer_list():
    record = db.session.query(Printing).all()
    converter = PrintingSchema(many=True, exclude=['order_elements', 'orders'])
    printers = converter.dump(record).data
    return jsonify(printers)


@printer.route('/printer/add', methods=['POST'])
@login_required
@login_required_admin()
def printer_add():
    printer = Printing(**request.json)
    db.session.add(printer)
    db.session.commit()
    return jsonify('ok')


@printer.route('/printer/update/<_id>', methods=['PUT'])
@login_required
@login_required_admin()
def printer_update(_id):
    data = request.json
    db.session.query(Printing).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@printer.route('/printer/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_admin()
def printer_delete(_id):
    db.session.query(Printing).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
