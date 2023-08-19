from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from application.models import Offer
from os import environ
import random
import requests

DATABASE_URL = environ.get("SQLALCHEMY_DATABASE_URI")

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def create_random_offer(title: str, description: str, image: str, user_id: int):
    offer = Offer(
        title=title,
        description=description,
        image=image,
        category=random.choice(["women", "men", "kids", "home"]),
        price=random.randrange(100, 10000),
        condition=random.choice(["new", "used"]),
        user_id=user_id,
    )
    return offer


def populate_database(num_offers_to_generate, user_id):
    session = SessionLocal()
    try:
        data = requests.get("https://64db666b593f57e435b0e7fa.mockapi.io/data/offers")
        data = data.json()
        for i in range(min(num_offers_to_generate, len(data))):
            rand_index = random.randrange(0, len(data) - 1)
            offer_data = data[rand_index]
            offer = create_random_offer(
                offer_data["title"],
                offer_data["description"],
                offer_data["image"],
                user_id,
            )
            session.add(offer)
            session.commit()
        session.close()
    except Exception as error:
        print(f"Error has occurred: {error}")


if __name__ == "__main__":
    num_offers_to_generate = 1
    user_id = 1
    if type(user_id) != int:
        print(f"Please provide user id!")
        exit()
    populate_database(num_offers_to_generate, user_id)
    print(f"Added {num_offers_to_generate} to DB")
