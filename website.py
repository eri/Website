# Flask dependencies
from flask import (
    Flask,
    render_template,
    send_from_directory,
    jsonify,
    redirect,
    request,
    session,
    make_response,
    abort,
)

# Freeze dependencies
from flask_frozen import Freezer

# Project constants
from src import constants

# Misc. dependencies
import requests
import datetime
import time
import os

# Set our Flask config
config = {
    "TEMPLATES_AUTO_RELOAD": True,  # Auto reload Flask
}

# Define the Flask Application
app = Flask(
    __name__, static_url_path="/", static_folder="static", template_folder="templates"
)
app.config.from_mapping(config)

# Define the Freeze instance for SSR
ssr = Freezer(app)

@app.route("/")
def index():
    return render_template(
        "index.html",
        **{
            "discord": get_discord_status(),
            "me": constants.me,
            "social": constants.social_metadata,
            "experiences": constants.experiences,
            "education": constants.education,
            "technologies": constants.technologies,
        },
    )

@app.route("/r/<name>/")
def social_redirect(name):
    if name in constants.social_metadata:
        return render_template(
            "redirect.html", **{"social": constants.social_metadata[name]}
        )

def get_discord_status():
    r = requests.get(f"https://api.lanyard.rest/v1/users/{constants.discord_id}")
    i = r.json()
    try:
        return {
            "success": True,
            "listening": True if i["data"]["listening_to_spotify"] else False,
            "avatar": f"https://cdn.discordapp.com/avatars/{constants.discord_id}/{i['data']['discord_user']['avatar']}.gif",
        }
    except Exception:
        return {"success": False, "listening": False}


@app.context_processor
def checkers():
    def main_metadata(value):
        return constants.main_metadata[value]

    def social_metadata(name, value):
        return constants.social_metadata[name][value]

    return dict(main_metadata=main_metadata, social_metadata=social_metadata)
