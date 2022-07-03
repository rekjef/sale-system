from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'aSDCAFB YUOASDVOYUEFYUVASDFVhiaef'

    # SQLAlchemy_DATABASE_URI =
    # f'postgresql://{user}:{password}@{address}:{port}/{pgdata}'

    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    return app
