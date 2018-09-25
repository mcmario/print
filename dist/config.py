import os

DEBUG = os.environ.get('DEBUG', False)
SECRET_KEY = os.environ.get('SECRET_KEY', 'banes_sekret_key')

USERNAME = os.environ.get('MYSQL_ROOT_USER', 'root')
DB_NAME = os.environ.get('MYSQL_DB_NAME', 'print')
PASSWORD = os.environ.get('MYSQL_ROOT_PASSWORD', 'mario1986')
PORT = os.environ.get('MYSQL_PORT_3306_TCP_PORT', 3306)
SERVER = os.environ.get('MYSQL_PORT_3306_TCP_ADDR', '127.0.0.1')

SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{username}:{password}@{server}:{port}/{db_name}?charset=utf8'.format(
    username=USERNAME, password=PASSWORD, server=SERVER, port=int(PORT), db_name=DB_NAME)
SQLALCHEMY_POOL_SIZE = 5
SQLALCHEMY_POOL_TIMEOUT = 3
SQLALCHEMY_POOL_RECYCLE = 120
SQLALCHEMY_MAX_OVERFLOW = 10
SQLALCHEMY_ECHO = False
SQLALCHEMY_TRACK_MODIFICATIONS = False
