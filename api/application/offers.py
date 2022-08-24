from flask import Blueprint, request
from .models import Offer, User
from . import db, ApiResponse

offers = Blueprint("offers", __name__)


# adds offer to website
@offers.route("/offer/add", methods=["POST"])
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

    return ApiResponse(
        data={"offer_id": new_offer.id},
        notification={
            "message": "Offer has been successfully added",
            "category": "success",
        },
        code=200,
    )


# returns info about offer by offer_id
@offers.route("/offer/get/<offer_id>", methods=["GET"])
def getOffer(offer_id):
    offer = Offer.query.filter_by(id=offer_id).first()
    if offer:
        seller = User.query.filter_by(id=offer.user_id).first()
        offer = {
            "details": {
                "id": offer.id,
                "title": offer.title,
                "description": offer.description,
                "image": offer.image,
                "category": offer.category,
                "price": offer.price,
                "condition": offer.condition,
                "date": offer.date,
            },
            "seller": {
                "id": seller.id,
                "first_name": seller.first_name,
                "last_name": seller.last_name,
                "email": seller.email,
                "join_date": seller.join_date,
            },
        }
        return ApiResponse(data=offer, code="200")

    return ApiResponse(
        notification={
            "message": "Offer cannot be found",
            "category": "error",
        },
        code=400,
    )


# returns info about latest <max_offer_count> offers
@offers.route("/offer/latest/", defaults={"max_offer_count": 6}, methods=["GET"])
@offers.route("/offer/latest/<max_offer_count>", methods=["GET"])
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
            "details": {
                "id": offer.id,
                "title": offer.title,
                "image": offer.image,
                "price": offer.price,
                "condition": offer.condition,
                "category": offer.category,
                "date": offer.date,
            },
            "seller": {
                "first_name": seller.first_name,
                "last_name": seller.last_name,
            },
        }
        response.append(offersDict)

    return ApiResponse(data={"offers": response}, code=200)
