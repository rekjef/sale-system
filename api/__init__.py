from flask import Flask

def create_api():
    api = Flask(__name__)
    api.config['SECRET_KEY'] = 'U9ZMMekd5UMc9A3b'

    return api