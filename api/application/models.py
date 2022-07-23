from . import db
from sqlalchemy import func


class Offer(db.Model):
    _tablename_ = "offers"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50))
    description = db.Column(db.String(1000))
    image = db.Column(db.String(1000))
    category = db.Column(db.String(150))
    price = db.Column(db.Float)
    condition = db.Column(db.String(150))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    join_date = db.Column(db.DateTime(timezone=True), default=func.now())
    offers = db.relationship("Offer")
