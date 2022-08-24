from flask import Blueprint
from .models import User
from . import ApiResponse

views = Blueprint("views", __name__)


# returns user info/offers by userID
@views.route("/user/<userID>", methods=["GET"])
def user(userID: int):
    user = User.query.filter_by(id=userID).first()
    if user:
        user_data = {
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "join_date": user.join_date,
        }

        user_offers = list()
        for offer in user.offers:
            user_offers.append(
                {
                    "id": offer.id,
                    "title": offer.title,
                    "image": offer.image,
                    "price": offer.price,
                    "condition": offer.condition,
                    "category": offer.category,
                    "date": offer.date,
                }
            )

        response_data = {"user": user_data, "offers": user_offers}
        return ApiResponse(data=response_data, code=200)

    return ApiResponse(code=400)
