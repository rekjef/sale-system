from application import create_app, reset_database_tables

app = create_app()


def update_db():
    reset_database_tables(app)


if __name__ == "__main__":
    app.run(debug=True)
