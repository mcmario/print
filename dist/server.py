import logging
from app import app
from alchemybase import db
from user import user
from customer import customer
from material import material
from order import order
from printer import printer
from price import price

db.init_app(app)
db.create_all()

if __name__ == '__main__':
    handler = logging.FileHandler('history.log', encoding='utf-8')
    handler.setLevel(logging.DEBUG)
    formatter = logging.Formatter('%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s', datefmt='%H:%M:%S')
    handler.setFormatter(formatter)
    app.logger.addHandler(handler)

    app.register_blueprint(user)
    app.register_blueprint(customer)
    app.register_blueprint(material)
    app.register_blueprint(order)
    app.register_blueprint(printer)
    app.register_blueprint(price)


    app.run(port=4450, debug=True, threaded=True)
    # app.run(host='0.0.0.0', port=5555, threaded=True)
