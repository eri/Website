from flask import (
    Flask,
    render_template,
    send_from_directory,
    jsonify,
    redirect,
    request,
    session,
    make_response,
)

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


@app.route("/")
def index():
    r = make_response(
        render_template(
            "index.html",
            **{
                "discord": get_discord_status(),
                "experiences": [
                    {
                        "name": "Discord Templates",
                        "position": "Founder & Developer",
                        "link": "https://discordtemplates.com?utm_source=eri.gg",
                        "time": "Since June 2020",
                    },
                    {
                        "name": "Top.gg",
                        "position": "Website Moderator",
                        "link": "https://top.gg?utm_source=eri.gg",
                        "time": "June 2019 > April 2021",
                    },
                    {
                        "name": "SARL Ayhan Restaurant",
                        "position": "Website Developer",
                        "link": None,
                        "time": "July 2020 > August 2020",
                    },
                ],
                "education": [
                    {
                        "name": "ESTIAM Paris",
                        "description": "Computer Science School applied to Businesses",
                        "link": "https://www.estiam.education/en/?utm_source=eri.gg",
                        "time": "Since October 2019",
                    },
                    {
                        "name": "HS Henri Sellier",
                        "description": "Technological Bachelor",
                        "link": "http://www.lycee-henri-sellier.fr/?utm_source=eri.gg",
                        "time": "September 2017 > July 2019",
                    },
                ],
                "technologies": [
                    {"name": "Python", "color": "blue-500", "size": "full"},
                    {"name": "Flask", "color": "gray-700", "size": "2/3"},
                    {"name": "Django", "color": "green-700", "size": "1/4"},
                    {"name": "Javascript", "color": "yellow-600", "size": "1/4"},
                    {"name": "HTML5", "color": "red-700", "size": "1/2"},
                    {"name": "PHP", "color": "indigo-500", "size": "1/6"},
                    {"name": "MongoDB", "color": "green-900", "size": "2/4"},
                    {"name": "Tailwind CSS", "color": "green-500", "size": "1/3"},
                ],
            },
        )
    )
    r.headers["Access-Control-Allow-Origin"] = "*"
    return r

@app.route("/blog/")
@app.route("/medium/")
def social_medium():
    return redirect("https://erionline.medium.com/?utm_source=eri.gg")


@app.route("/discord")
def social_discord():
    return redirect("https://discord.com/users/187316528100802560/?utm_source=eri.gg")


@app.route("/twitter")
def social_twitter():
    return redirect("https://twitter.com/erionline/?utm_source=eri.gg")


@app.route("/github")
def social_github():
    return redirect("https://github.com/eri/?utm_source=eri.gg")


@app.route("/linkedin")
def social_linkedin():
    return redirect("https://linkedin.com/in/erayc/?utm_source=eri.gg")


def get_discord_status():
    r = requests.get("https://api.lanyard.rest/v1/users/187316528100802560")
    i = r.json()
    try:
        st = i["data"]["discord_status"]
        color = (
            "green"
            if st == "online"
            else "yellow"
            if st == "idle"
            else "red"
            if st == "dnd"
            else "gray"
        )

        if i["data"]["listening_to_spotify"]:
            pr_artist = i["data"]["spotify"]["artist"].split(";")[0].split(",")[0]
            pr_song = i["data"]["spotify"]["song"]
            return {
                "success": True,
                "status": color,
                "artist": pr_artist,
                "song": pr_song,
                "avatar": f"https://cdn.discordapp.com/avatars/187316528100802560/{i['data']['discord_user']['avatar']}.gif",
            }

        return {
            "success": True,
            "status": color,
            "avatar": f"https://cdn.discordapp.com/avatars/187316528100802560/{i['data']['discord_user']['avatar']}.gif",
        }
    except Exception:
        return {"success": False}


if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port="8000")