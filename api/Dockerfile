FROM python:3.10

WORKDIR /app

COPY ./requirements.txt .

RUN pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP api.py

ENV FLASK_ENV development

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]