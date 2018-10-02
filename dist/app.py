from flask import Flask, render_template, redirect, url_for, flash, jsonify, request
from werkzeug.contrib.fixers import ProxyFix
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from forms import LoginForm
from functools import wraps
from alchemybase import db, User, Printing, Order
from sqlalchemy import or_

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


def login_required_admin():
    def wrapper(f):
        @wraps(f)
        def decorated_view(*args, **kwargs):
            type = db.session.query(User.type).filter(User.id == current_user.get_id()).first()
            if type[0] != 'admin':
                return redirect(url_for('index'))
            return f(*args, **kwargs)

        return decorated_view

    return wrapper


def login_required_manager():
    def wrapper(f):
        @wraps(f)
        def decorated_view(*args, **kwargs):
            type = db.session.query(User.type).filter(User.id == current_user.get_id()).first()
            if type[0] != 'manager' and type[0] != 'admin':
                return redirect(url_for('index'))
            return f(*args, **kwargs)

        return decorated_view

    return wrapper


def login_required_manager_change():
    def wrapper(f):
        @wraps(f)
        def decorated_view(_id,*args, **kwargs):
            type = db.session.query(User.type).filter(User.id == current_user.get_id()).first()
            order = db.session.query(Order).filter(Order.id == _id).filter(
                or_(Order.status == 'pending', Order.status == 'sent')).first()
            print(order)
            if (type[0] != 'manager' and type[0] != 'admin') or order == None:
                return redirect(url_for('index'))
            return f(_id,*args, **kwargs)

        return decorated_view

    return wrapper


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


@app.route('/register', methods=['GET', 'POST'])
def register():
    user = User(surname='admin', name='admin', login='admin', password='admin', type='admin')
    # user = User(surname='worker', name='worker', login='worker', password='worker', type='worker')
    # user = User(surname='print', name='print', login='print', password='print', type='print')
    db.session.add(user)
    db.session.flush()
    db.session.commit()
    return jsonify('ok')


@app.route('/get_type', methods=['GET'])
@login_required
def get_type():
    type = db.session.query(User.type).filter(User.id == current_user.get_id()).first()
    return jsonify(type[0])


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
