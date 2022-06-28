from . import create_api

api = create_api()

@api.route("/")
def main():
    return {"message": "Hello worldss"}


if __name__ == "__main__":
    api.run(debug=True)