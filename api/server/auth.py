from flask import Blueprint, jsonify, request, abort, jsonify

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