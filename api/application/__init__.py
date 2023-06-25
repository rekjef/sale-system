from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session

db = SQLAlchemy()
sess = Session()


# sets up api conf
def create_app():
    app = Flask(__name__, instance_relative_config=False)
    app.config.from_object("config.Config")
    app.config["FLASK_DEBUG"] = 1

    db.init_app(app)
    sess.init_app(app)

    with app.app_context():
        from .auth import auth
        from .views import views
        from .offers import offers

        app.register_blueprint(views)
        app.register_blueprint(auth)
        app.register_blueprint(offers)

        db.create_all()

        return app


# api response schema
def ApiResponse(code: int, data={}, notification={}) -> dict:
    data.update({"notification": notification})
    return (jsonify(data), str(code))


# wipes db, adds new instance
def reset_database_tables(app):
    with app.app_context():
        db.drop_all()
        db.create_all()
