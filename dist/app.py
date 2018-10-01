from flask import Flask, render_template, redirect, url_for, flash, jsonify, request
from werkzeug.contrib.fixers import ProxyFix
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from forms import LoginForm
from alchemybase import db, User, Printing, Customer, Material, Order, UserSchema, CustomerSchema, MaterialSchema, \
    Order_elementSchema, OrderSchema, Order_element, PrintingSchema, Client_type, Price, Client_typeSchema, PriceSchema

app = Flask(__name__)
app.config.from_object('config')
app.wsgi_app = ProxyFix(app.wsgi_app)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "login_view"
login_manager.login_message = "Будь ласка пройдіть авторизацію для доступу до ресурсу!"
login_manager.login_message_category = "info"


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/auth', methods=['GET', 'POST'])
def login_view():
    form = LoginForm()
    if form.validate_on_submit():
        user = db.session.query(User).filter(User.login == form.login.data).first()
        if user is not None and user.verify_password(form.password.data):
            login_user(user)
        flash('Не вірний логін або пароль!', category='warning')
        return redirect(url_for('index'))
    return render_template('login.html', form=form)


@app.route('/user/list', methods=['GET'])
@login_required
def user_list():
    record = db.session.query(User).all()
    converter = UserSchema(many=True, exclude=['password_hash', 'orders'])
    users = converter.dump(record).data
    return jsonify(users)


@app.route('/user/add', methods=['POST'])
@login_required
def user_add():
    data = request.json
    data['birthday'] = data['birthday'][0:10]
    user = User(**data)
    db.session.add(user)
    db.session.commit()
    return jsonify('ok')


@app.route('/user/update/<_id>', methods=['PUT'])
@login_required
def user_update(_id):
    data = request.json
    data['birthday'] = data['birthday'][0:10]
    db.session.query(User).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@app.route('/user/change_password/<_id>', methods=['PUT'])
@login_required
def user_change_password(_id):
    new_password = request.data
    user = db.session.query(User).filter_by(id=_id).first()
    user.password = new_password
    db.session.commit()
    return jsonify('ok')


@app.route('/user/delete/<_id>', methods=['DELETE'])
@login_required
def user_delete(_id):
    db.session.query(User).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')


@app.route('/customer/list', methods=['GET'])
@login_required
def customer_list():
    record = db.session.query(Customer).all()
    converter = CustomerSchema(many=True, exclude=['orders'])
    customers = converter.dump(record).data
    return jsonify(customers)


@app.route('/customer/add', methods=['POST'])
@login_required
def customer_add():
    customer = Customer(**request.json)
    db.session.add(customer)
    db.session.commit()
    return jsonify('ok')


@app.route('/customer/update/<_id>', methods=['PUT'])
@login_required
def customer_update(_id):
    data = request.json
    db.session.query(Customer).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@app.route('/customer/delete/<_id>', methods=['DELETE'])
@login_required
def customer_delete(_id):
    db.session.query(Customer).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')


@app.route('/material/list', methods=['GET'])
@login_required
def material_list():
    record = db.session.query(Material).all()
    converter = MaterialSchema(many=True, exclude=['order_elements'])
    materials = converter.dump(record).data
    return jsonify(materials)


@app.route('/material/add', methods=['POST'])
@login_required
def material_add():
    material = Material(**request.json)
    db.session.add(material)
    db.session.commit()
    return jsonify('ok')


@app.route('/material/update/<_id>', methods=['PUT'])
@login_required
def material_update(_id):
    data = request.json
    db.session.query(Material).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@app.route('/material/delete/<_id>', methods=['DELETE'])
@login_required
def material_delete(_id):
    db.session.query(Material).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')


@app.route('/order/list/<status>', methods=['GET'])
@login_required
def order_list(status):
    record = db.session.query(Order).filter(Order.status == status).all()
    converter = OrderSchema(many=True,
                            only=['address', 'approximate_date', 'fk_user', 'delivery_type', 'id', 'payment', 'status',
                                  'comment', 'date_created', 'date_finish', 'total', 'fk_customer', 'fk_printing',
                                  'user.surname', 'user.name', 'printing.name', 'customer'])
    orders = converter.dump(record).data
    return jsonify(orders)


@app.route('/order/add', methods=['POST'])
@login_required
def order_add():
    order = Order(**request.json)
    db.session.add(order)
    db.session.commit()
    return jsonify(order.id)


@app.route('/order/info/<_id>', methods=['GET'])
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


@app.route('/order/update/<_id>', methods=['PUT'])
@login_required
def order_update(_id):
    data = request.json
    db.session.query(Order).filter_by(id=_id).update(data)
    db.session.commit()
    return jsonify('ok')


@app.route('/order/delete/<_id>', methods=['DELETE'])
@login_required
def order_delete(_id):
    db.session.query(Order).filter_by(id=_id).delete()
    db.session.commit()
    return jsonify('ok')


# @app.route('/register', methods=['GET', 'POST'])
# def register():
#     user = User(surname='admin', name='admin', login='admin', password='admin', type='admin')
#     db.session.add(user)
#     db.session.flush()
#     db.session.commit()
#     return jsonify('ok')


@app.route('/sign_out')
@login_required
def drop_session():
    user_login = current_user.get_id()
    logout_user()
    app.logger.info('[ACCESS AUDIT] Пользователь [%s] вышел из системы' % user_login)
    return redirect(url_for('login_view'))


@app.route('/')
@login_required
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
