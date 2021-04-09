from flask import Blueprint
import requests


quotes = Blueprint("quotes", __name__)


@quotes.route("/")
def zen_quote():
    headers = {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json"
    }
    res = requests.get("https://zenquotes.io/api/random", headers=headers)
    data = res.json()
    quote = data[0]["q"]
    author = data[0]["a"]
    return {"quote": quote, "author": author}
