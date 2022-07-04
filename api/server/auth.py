from flask import Blueprint, request

auth = Blueprint("auth", __name__)


@auth.route("/signin", methods=["GET", "POST"])
def signin():
    data = request.json
    print(data)
    return "signin"


@auth.route("/logout")
def logout():
    return "Logout"


@auth.route("/signup", methods=["GET", "POST"])
def sign_up():
    data = request.json

    if request.method == "POST":
        firstName = data["firstName"]
        lastName = data["lastName"]
        email = data["email"]
        password = data["password"]

        if len(firstName) < 2:
            return {
                "notification": {
                    "message":
                        "Firstname must be longer than 1 character.",
                    "category": "error"
                }

            }
        if len(lastName) < 2:
            return {
                "notification": {
                    "message":
                        "Lastname must be longer than 2 character.",
                    "category": "error"
                }

            }
        elif len(email) < 4:
            return {
                "notification": {
                    "message":
                        "Email must be longer than 4 character.",
                    "category": "error"
                }

            }
        elif len(password) < 4:
            return {
                "notification": {
                    "notificationMessage":
                        "Password must be longer than 4 character.",
                    "category": "error"
                }

            }
        else:
            return {
                "notification": {
                    "message":
                        "Your account has been successfully created.",
                    "category": "success"
                }
            }

    return "error"
