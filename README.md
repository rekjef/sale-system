# SaleSystem - items exchange service

SaleSystem is a platform that allows users to sell or buy items.
You can create account to post your offers or look through already posted ones.
Inspired by [vinted.pl](https://www.vinted.com)

## Tech Stack

**Frontend:** React, TypeScript, Material-UI

**Backend:** Flask

**Database:** PostgreSQL, Redis

**Other**: Docker

## Installation

Clone the project and build it in Docker Compose

```bash
docker-compose build
```

## Run Locally

Run the app using Docker

```bash
  docker-compose up
```

Close the app by typing

```bash
  docker-compose down
```

## Environment Variables

Config and environment variables are located in:

- api/.env
- api/config.py

## Screenshots

![HomePage](/ui/src/assets/images/readme_screenshots/home_page.png)
![OfferPage](/ui/src/assets/images/readme_screenshots/offer_page.png)
![UserPage](/ui/src/assets/images/readme_screenshots/user_page.png)
![AddOfferPage](/ui/src/assets/images/readme_screenshots/addOffer_page.png)
