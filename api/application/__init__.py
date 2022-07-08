from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

db = SQLAlchemy()
sess = Session()


def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")

    db.init_app(app)
    sess.init_app(app)

    with app.app_context():
        from .auth import auth
        from .views import views

        app.register_blueprint(views)
        app.register_blueprint(auth)

        db.create_all(app=app)

        return app
