from flask import Flask, render_template, redirect, url_for, flash, jsonify, request
from werkzeug.contrib.fixers import ProxyFix
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from forms import LoginForm
from alchemybase import db, User, Printing, Customer, Material, UserSchema


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
    converter = UserSchema(many=True, exclude=['password_hash'])
    users = converter.dump(record).data
    return jsonify(users)

@app.route('/user/add', methods=['POST'])
@login_required
def user_add():
    user = User(**request.json)
    db.session.add(user)
    db.session.commit()
    return jsonify('ok')

@app.route('/user/update/<_id>', methods=['PUT'])
@login_required
def user_update(_id):
    data = request.json
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

@app.route('/register', methods=['GET', 'POST'])
def register():
    user = User(surname='admin', name='admin', login='admin', password='admin', type='admin')
    db.session.add(user)
    db.session.flush()
    db.session.commit()
    return jsonify('ok')


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
