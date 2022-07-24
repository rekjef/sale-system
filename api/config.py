from dotenv import load_dotenv
from os import environ
import redis

load_dotenv()


class Config:

    # Main
    SECRET_KEY = environ.get("SECRET_KEY")

    # Postgres
    SQLALCHEMY_DATABASE_URI = environ.get("SQLALCHEMY_DATABASE_URI")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True

    # Session
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = redis.from_url(environ.get("SESSION_REDIS"))


class TestingConfig(Config):
    DEBUG = True
    TESTING = True
