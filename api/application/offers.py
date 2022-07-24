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
    db.session.flush()
    db.session.commit()
    return (
        jsonify(
            {
                "offer_id": new_offer.id,
                "notification": {
                    "message": "Offer has been successfully added",
                    "category": "success",
                },
            }
        ),
        "200",
    )


@offers.route("/get-offer/<offer_id>", methods=["GET"])
def getOffer(offer_id):
    offer = Offer.query.filter_by(id=offer_id).first()
    if offer:
        seller = User.query.filter_by(id=offer.user_id).first()
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
                        "seller": {
                            "id": seller.id,
                            "first_name": seller.first_name,
                            "last_name": seller.last_name,
                            "email": seller.email,
                            "join_date": seller.join_date,
                        },
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


# default max_count = 6
@offers.route("/get-latest-offers/", defaults={"max_offer_count": 6}, methods=["GET"])
@offers.route("/get-latest-offers/<max_offer_count>", methods=["GET"])
def getLatestOffers(max_offer_count: int):
    offers = Offer.query.all()
    response = list()
    offer_count = 0
    for offer in offers:
        offer_count += 1
        if offer_count > int(max_offer_count):
            break

        seller = User.query.filter_by(id=offer.user_id).first()
        offersDict = {
            "id": offer.id,
            "title": offer.title,
            "image": offer.image,
            "price": offer.price,
            "condition": offer.condition,
            "category": offer.category,
            "date": offer.date,
            "seller": {
                "first_name": seller.first_name,
                "last_name": seller.last_name,
            },
        }
        response.append(offersDict)

    return (jsonify({"offers": response}), "200")
