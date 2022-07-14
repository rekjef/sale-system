from flask import Blueprint, request, jsonify
from .models import Offer, User
from . import db

offers = Blueprint("offers", __name__)


# add invalid offers handling
@offers.route("/add-offer", methods=["POST"])
def addOffer():
    data = request.json
    new_offer = Offer(
        title=data["title"],
        description=data["description"],
        image=data["image"],
        category=data["category"],
        price=data["price"],
        condition=data["condition"],
        user_id=data["user_id"],
    )
    db.session.add(new_offer)
    db.session.commit()
    return (
        jsonify(
            {
                "notification": {
                    "message": "Offer has been successfully added",
                    "category": "success",
                },
            }
        ),
        "200",
    )


@offers.route("/get-offer/<offerID>", methods=["GET"])
def getOffer(offerID):
    offer = Offer.query.filter_by(id=offerID).first()
    if offer:
        creator = User.query.filter_by(id=offer.user_id).first()
        return (
            jsonify(
                {
                    "offer": {
                        "id": offer.id,
                        "title": offer.title,
                        "description": offer.description,
                        "image": offer.image,
                        "category": offer.category,
                        "price": offer.price,
                        "condition": offer.condition,
                        "date": offer.date,
                    },
                    "creator": {
                        "first_name": creator.first_name,
                        "last_name": creator.last_name,
                        "email": creator.email,
                    },
                }
            ),
            "200",
        )

    return (
        jsonify(
            {
                "notification": {
                    "message": "Offer cannot be found",
                    "category": "error",
                },
            }
        ),
        "400",
    )
