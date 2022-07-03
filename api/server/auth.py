from flask import Blueprint

auth = Blueprint('auth', __name__)


@auth.route('/login')
def login():
    return 'Login'


@auth.route('/logout')
def logout():
    return 'Logout'


@auth.route('/signup')
def sign_up():
    return 'as'
