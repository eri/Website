# Personal Website

Welcome to my personal website's repository. Made with Flask and WindiCSS (compiler for TailwindCSS).

## ✨ Features
* **WindiCSS support.** WindiCSS is a compiler for TailwindCSS which comes with additional features and faster load times.
* **Dark & Light theme support.** Save your eyes safe with dark theme, switch with a button on the navbar, save the theme locally
* **Responsive.** Comfortably view the site from desktops, tablets and mobile devices.
* **Dynamic & Static support.** Run with a Flask server as a dynamic website or generate a static version (for Netlify/Vercel).
* **No HTML edit needed.** Get your website ready to use by configuring everything you need in one single file.
* **Discord presence support.** Live display your Spotify activity on your website directly.

## 🔎 Live version
You can view a public version of my site at [eri.gg](https://eri.gg).

## 📚 Dependencies and requirements
- [**Python v3.5 or higher**](https://www.python.org/downloads/) (dependencies may break with older versions)
- [**Flask 1.0.2 or higher**](https://flask.palletsprojects.com/en/1.1.x/installation/) (backend of the site)
- [**Frozen_Flask 0.15**](https://pythonhosted.org/Frozen-Flask/#installation) (to render a static version of the site)
- [**Requests 2.23.0**](https://docs.python-requests.org/en/master/user/install/) (for server-side API requests)


## ⚙️ Installation
1. Open a terminal/shell and clone this repository with `git clone https://github.com/eri/Website.git`
2. Install dependencies with the `pip install -r requirements.txt` command
3. Go to the `/src` folder and edit the `constants.py` file with your own settings
> **Note:** If you would like to get a static version of your site, keep `ssr` as `True`.
> 
> If you would like to run a Flask server, change `ssr` as `False`. In that case, you can set a host (IP) and a port where the website will be run. It's recommended to keep `host` as `0.0.0.0` if the address is pointing a local address (like `localhost` or `127.0.0.1`). You are free to change the `port` as you wish.
4. Run the `py run.py` command on your terminal/shell
5. If `ssr` in `constants.py` is **`False`**, a static version of the site has been generated in a new folder named `/build`.
> I recommend you to host this static version on [Netlify](https://netlify.com) or [Vercel](https://vercel.com/) directly for FREE.
7. If `ssr` is `constants.py` is **`True`**, your site will be available at the `host:port` that you specified. (https://localhost:8000/ by default)

## 📸 Preview
![preview](https://i.imgur.com/v7Q9R6v.png)

## Todo
- [ ] Add a blog view to display your Medium stories
- [ ] Localization support by using [Flask Babel](https://flask-babel.tkte.ch/)
