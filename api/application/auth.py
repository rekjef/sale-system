from flask import Blueprint, jsonify, request, session
from .models import User
from . import db, ApiResponse
from werkzeug.security import check_password_hash, generate_password_hash


auth = Blueprint("auth", __name__)


# checks if user is authenticated, if so returns his info
@auth.route("/user/current", methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    if user_id is None:
        return jsonify({"error": "Unauthorized"})
    user = User.query.filter_by(id=user_id).first()

    response_data = {"id": user.id, "email": user.email, "isLogged": True}
    return ApiResponse(data=response_data, code=200)


# handles user sign-in
@auth.route("/user/sign-in", methods=["POST"])
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
            return ApiResponse(
                notification={"message": "Password is invalid", "category": "error"},
                code=409,
            )
    else:
        return ApiResponse(
            notification={
                "message": "User with this email does not exists",
                "category": "error",
            },
            code=401,
        )

    session["user_id"] = user.id

    return ApiResponse(
        data={
            "id": user.id,
            "email": user.email,
        },
        notification={
            "message": "Logged in",
            "category": "success",
        },
        code=200,
    )


# handles user sign out by removing cookie from redis/website
@auth.route("/user/sign-out", methods=["GET"])
def signout():
    session.pop("user_id")
    return ApiResponse(
        data={
            "notification": {
                "message": "Logged out",
                "category": "success",
            },
        },
        code=200,
    )


# adds new user
@auth.route("/user/sign-up", methods=["POST"])
def sign_up():
    data = request.json

    if request.method == "POST":
        first_name = data["first_name"]
        last_name = data["last_name"]
        email = data["email"]
        password = data["password"]

        if len(first_name) < 2:
            return ApiResponse(
                notification={
                    "message": "first_name must be longer than 1 character.",
                    "category": "error",
                },
                code=200,
            )

        elif len(last_name) < 2:
            return ApiResponse(
                notification={
                    "message": "last_name must be longer than 2 character.",
                    "category": "error",
                },
                code=200,
            )

        elif len(email) < 4:
            return ApiResponse(
                notification={
                    "message": "Email must be longer than 4 character.",
                    "category": "error",
                },
                code=200,
            )

        elif len(password) < 4:
            return ApiResponse(
                notification={
                    "message": "Password must be longer than 4 character.",
                    "category": "error",
                },
                code=200,
            )

        user_exists = User.query.filter_by(email=email).first() is not None
        if user_exists:
            return ApiResponse(data={"error": "User already exists"}, code=409)

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

    return ApiResponse(
        data={
            "id": new_user.id,
            "email": new_user.email,
        },
        notification={
            "message": "Logged in",
            "category": "success",
        },
        code=200,
    )
