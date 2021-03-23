from flask import Flask, render_template, send_from_directory, jsonify, redirect, request, session, make_response

import requests
import datetime
import pymongo
import time
import os

# Set our Flask config
config = {
    "DEBUG": True,                  # Flask debugging
    "TEMPLATES_AUTO_RELOAD": True,  # Auto reload Flask
}

# Define the Flask Application
app = Flask(__name__, static_url_path='/', static_folder='static')
app.config.from_mapping(config)


@app.route('/')
def index():
    r = make_response(render_template("index.html", **{"posts":get_medium_posts(),"status":get_discord_status()}))
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r

@app.route('/blog/latest/')
def latest_story():
    r = requests.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erionline&api_key=5dfjtvxknfp1qkqzocw2qbdns0es6x7keqrgrseb")
    return redirect(r.json()['guid']+"?utm_source=eri.gg")

@app.route('/api/presence/')
def current_presence():
    r = make_response(jsonify(get_discord_status()))
    r.headers['Access-Control-Allow-Origin'] = '*'
    return r

@app.route('/discord')
def social_discord():
    return redirect("https://discord.gg/wxsYD4dh9S?utm_source=eri.gg")
@app.route('/twitter')
def social_twitter():
    return redirect("https://twitter.com/erionline?utm_source=eri.gg")
@app.route('/github')
def social_github():
    return redirect("https://github.com/eri?utm_source=eri.gg")

def get_medium_posts():
    posts = []
    r = requests.get("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@erionline" +
                    "&api_key=5dfjtvxknfp1qkqzocw2qbdns0es6x7keqrgrseb")
    response = r.json()

    for i in response['items']:
        # Calculate the read time
        words = len(i['description'].split(" "))
        read_time, multiplicator = 0, 0
        while words > multiplicator:
            multiplicator += 250
            read_time += 1

        posts.append({
                        "title": i['title'],
                        "date": str(datetime.datetime.strptime(i['pubDate'], '%Y-%m-%d %H:%M:%S').strftime("%d/%m/%Y")),
                        "days": str((datetime.datetime.now()-datetime.datetime.strptime(i['pubDate'], '%Y-%m-%d %H:%M:%S')).days) + " days" if not 0 else "a few hours",
                        "link": str(i['guid']) + "?utm_source=eri.gg",
                        "description": i['description'].split(">")[1].split("<")[0],
                        "read_time": read_time,
                        "tags": i['categories'][:2]
                    })
    return posts

def get_discord_status():
    r = requests.get("https://api.lanyard.rest/v1/users/187316528100802560")
    i = r.json()
    try:
        st = i['data']['discord_status']
        color = "green" if st=="online" else "yellow" if st=="idle" else "red" if st=="dnd" else "gray"
        
        if i['data']['listening_to_spotify']:
            pr_artist = i['data']['spotify']['artist'].split(";")[0].split(",")[0]
            pr_song = i['data']['spotify']['song']
            return {"success":True, "status":color, "artist":pr_artist,"song":pr_song}

        return {"success":True, "status":color}
    except Exception:
        return {"success":False}

if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", port="8000")