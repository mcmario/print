from flask import Blueprint, jsonify, request
from flask_login import login_required
from alchemybase import db, User, UserSchema
from app import login_required_admin


user = Blueprint('user', __name__)

@user.route('/user/list', methods=['GET'])
@login_required
@login_required_admin()
def user_list():
    record = db.session.query(User).all()
    converter = UserSchema(many=True, exclude=['password_hash', 'orders'])
    users = converter.dump(record).data
    return jsonify(users)


@user.route('/user/add', methods=['POST'])
@login_required
@login_required_admin()
def user_add():
    data = request.json
    data['birthday'] = data['birthday'][0:10]
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify('ok')


@user.route('/user/update/<_id>', methods=['PUT'])
@login_required
@login_required_admin()
def user_update(_id):
    data = request.json
    data['birthday'] = data['birthday'][0:10]
    db.session.query(User).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@user.route('/user/change_password/<_id>', methods=['PUT'])
@login_required
@login_required_admin()
def user_change_password(_id):
    new_password = request.data
    user = db.session.query(User).filter_by(id=_id).first()
    user.password = new_password
    db.session.commit()
    return jsonify('ok')


@user.route('/user/delete/<_id>', methods=['DELETE'])
@login_required
@login_required_admin()
def user_delete(_id):
    db.session.query(User).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')
