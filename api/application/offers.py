from flask import Blueprint, request
from .models import Offer, User
from . import db, ApiResponse

offers = Blueprint("offers", __name__)


def get_seller(user_id):
    return User.query.filter_by(id=user_id).first()


def build_offer_dict(offer, seller):
    return {
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


@offers.route("/offer/add", methods=["POST"])
def add_offer():
    data = request.json
    new_offer = Offer(**data)
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


@offers.route("/offer/get/<offer_id>", methods=["GET"])
def get_offer(offer_id):
    offer = Offer.query.filter_by(id=offer_id).first()
    if offer:
        seller = get_seller(offer.user_id)
        offer_data = build_offer_dict(offer, seller)
        return ApiResponse(data=offer_data, code=200)

    return ApiResponse(
        notification={
            "message": "Offer cannot be found",
            "category": "error",
        },
        code=400,
    )


@offers.route("/offer/latest/", defaults={"max_offer_count": 6}, methods=["GET"])
@offers.route("/offer/latest/<max_offer_count>", methods=["GET"])
def get_latest_offers(max_offer_count):
    offers = Offer.query.limit(int(max_offer_count)).all()
    response = []
    for offer in offers:
        seller = get_seller(offer.user_id)
        offer_data = build_offer_dict(offer, seller)
        response.append(offer_data)

    return ApiResponse(data={"offers": response}, code=200)


@offers.route("/offers/", methods=["GET"])
def get_offers():
    offers = Offer.query.order_by(Offer.date.desc())
    offers_count = offers.count()

    response = []
    for offer in offers:
        seller = get_seller(offer.user_id)
        offer_data = build_offer_dict(offer, seller)
        response.append(offer_data)

    return ApiResponse(
        data={"offers": response, "offers_count": offers_count}, code=200
    )
