# Sangha

* [Here's](https://sangha-full-stack.herokuapp.com/) a link to my live application!
* [Here's](https://github.com/CJNewcomer/sangha/wiki) a link to Sangha's Wiki!


## Technologies Used
* React.js
* Redux
* JavaScript
* Python
* Flask
* SQLAlchemy
* Alembic
* PostgreSQL
* CSS


## What is it?
Sangha, pronounced "suhng-guh", is a social networking, booking platform where students and teachers can share their practice.

## Want to Develop?
### Here is what you will need on your machine of choice:

* PostgreSQL
* Pipenv with Python v3.8
* Node.js

1. `git clone` this repo
2. `cd` into the local repo
3. Run `pipenv install -r --dev dev-requirements.txt && pipenv install -r requirements.txt'
4. Create your own `.env` file based on the provided `.env.example`.
5. Create a user and database in your PostgreSQL that matches your `.env` configuration
6. In the first terminal, run `pipenv shell` to activate the Pipenv environment.
7. Run `flask db upgrade` and then `flask seed all` to apply migrations and seed data to your database.
8. Open another terminal window and `cd` into the local repo, then `cd` into react-app
9. Run `npm install`
10. In your terminal running Pipenv shell, run `flask run`.
11. In your terminal in the react-app, run `npm start`.
12. Your app should open in your default browser.
13. If you are planning on developing, please make a fork and create pull requests as necessary.
