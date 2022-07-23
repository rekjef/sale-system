from flask import Blueprint, jsonify
from .models import User

views = Blueprint("views", __name__)


@views.route("/profile/<userID>")
def profile(userID: int):
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
        return jsonify({"user": user_data, "offers": user_offers}), "200"

    return "400"
