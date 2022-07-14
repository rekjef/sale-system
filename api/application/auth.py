from flask import Blueprint, jsonify, request, session
from .models import User
from . import db
from werkzeug.security import generate_password_hash, check_password_hash


auth = Blueprint("auth", __name__)


@auth.route("/currentuser", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if user_id is None:
        return jsonify({"error": "Unauthorized"})
    user = User.query.filter_by(id=user_id).first()
    return jsonify({"id": user.id, "email": user.email, "isLogged": True})


@auth.route("/signin", methods=["GET", "POST"])
def sign_in():
    data = request.json
    email = data["email"]
    password = data["password"]
    user = User.query.filter_by(email=email).first()
    if user:
        if check_password_hash(user.password, password):
            print("Logged in")
        else:
            print("Password is invalid")
            return jsonify({"error": "Password is invalid"}), "409"
    else:
        return jsonify({"error": "User with this credentials does not exists"}), "401"

    session["user_id"] = user.id

    return jsonify(
        {
            "id": user.id,
            "email": user.email,
            "notification": {
                "message": "Logged in",
                "category": "success",
            },
        }
    )


@auth.route("/signout", methods=["POST"])
def signout():
    session.pop("user_id")
    return (
        jsonify(
            {
                "notification": {
                    "message": "Logged out",
                    "category": "success",
                },
            }
        ),
        "200",
    )


@auth.route("/signup", methods=["GET", "POST"])
def sign_up():
    data = request.json

    if request.method == "POST":
        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        password = data["password"]

        if len(first_name) < 2:
            return {
                "notification": {
                    "message": "first_name must be longer than 1 character.",
                    "category": "error",
                }
            }
        elif len(last_name) < 2:
            return {
                "notification": {
                    "message": "last_name must be longer than 2 character.",
                    "category": "error",
                }
            }
        elif len(email) < 4:
            return {
                "notification": {
                    "message": "Email must be longer than 4 character.",
                    "category": "error",
                }
            }
        elif len(password) < 4:
            return {
                "notification": {
                    "message": "Password must be longer than 4 character.",
                    "category": "error",
                }
            }

        user_exists = User.query.filter_by(email=email).first() is not None
        if user_exists:
            return jsonify({"error": "User already exists"}), "409"

        hashed_password = generate_password_hash(password)
        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password,
        )

        db.session.add(new_user)
        db.session.commit()

        session["user_id"] = new_user.id
    return jsonify(
        {
            "id": new_user.id,
            "email": new_user.email,
            "notification": {
                "message": "Logged in",
                "category": "success",
            },
        }
    )
