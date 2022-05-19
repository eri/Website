![CleanShot Pro - 13-05-2022 at 01 28 50](https://user-images.githubusercontent.com/38740024/168183634-46839b95-33d4-4796-a674-602444ed69d9.png)


<h1 align="center">Personal Website</h1>
<p align="center">
<img alt="Python" src="https://img.shields.io/badge/python-%2314354C.svg?&style=for-the-badge&logo=python&logoColor=white"/>
<img alt="Flask" src="https://img.shields.io/badge/flask-%23000.svg?&style=for-the-badge&logo=flask&logoColor=white"/>
<img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/>
</p>
<p align="center">Welcome to my personal website's repository. Made with Python Flask and WindiCSS.</p>

## 🔄&nbsp; Update — May 2022
- Fixed dependencies bugs with `jinja` & specific Python versions preventing the app to start
- Fixed the broken dark / white theme switcher ([#6](https://github.com/eri/Website/pull/6))
- Added a complete guide to deploy to Netlify on this README
- Global rewrite of this README with structure and design changes
- This version will be deprecated in favor of a new version made with React & TailwindCSS.

## ✨&nbsp; Features
* **WindiCSS support.** WindiCSS is a new frontend framework using classes for styles providing faster load times.
* **Dark & Light theme support.** Switch with a button on the navbar, saves theme preference on your device
* **Responsive.** Comfortably view the site from desktops, tablets and mobile devices.
* **Dynamic & Static support.** Run with a Flask server as a dynamic website or generate a static version (for Netlify/Vercel).
* **No HTML edit needed.** Get your website ready to use by configuring everything you need in one single file.
* **Discord presence support.** Live display your Spotify activity on your website directly.

## 🔎&nbsp; Live version
You can view a public version of my site at [eri.gg](https://eri.gg).

## 📚&nbsp; Dependencies and requirements
- [**Python v3.5 - v3.8**](https://www.python.org/downloads/) (dependencies may break with other versions)
- [**Flask 2.1.0 or higher**](https://flask.palletsprojects.com/en/1.1.x/installation/) (backend of the site)
- [**Frozen_Flask 0.15**](https://pythonhosted.org/Frozen-Flask/#installation) (to render a static version of the site)
- [**Requests 2.23.0**](https://docs.python-requests.org/en/master/user/install/) (for server-side API requests)

## 🙌&nbsp; Deploying to Netlify
Netlify is a free service allowing you to deploy web applications **for FREE** without needing any server. You can get a custom `.netlify.app` domain name along with your site.

### 1. Get a Netlify account
Go to [Netlify's website](https://netlify.com) and create an account or log in.

### 2. Use the quick "Deploy to Netlify" button

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/eri/Website)

### 3. Make changes on your Netlify configuration
![CleanShot Pro - 13-05-2022 at 00 39 21](https://user-images.githubusercontent.com/38740024/168179268-5fc54612-19f6-4834-9c5f-b630cb09bd40.png)
![CleanShot Pro - 13-05-2022 at 00 42 49](https://user-images.githubusercontent.com/38740024/168179509-db3b1960-d4c0-44b7-8c83-96f30684bf7a.png)

### 4. Run the deploy process
Go to your `Team settings` > `Your site` > `Builds` and then, click on `Retry deploy` to deploy again with your new configuration.

![CleanShot Pro - 13-05-2022 at 00 50 58](https://user-images.githubusercontent.com/38740024/168180344-96fd49e0-b67e-47e3-993f-6c09c15fc6af.png)

### 5. Your site is live &nbsp;✨
Check out your domain associated to your website to see your website rendered! 

Edit the `constants.py` file under the `/src` folder to customize it and push to your GitHub repository. Netlify will automatically deploy and update your site.

## ⚙️ Local installation & running
**Please note that if you deployed your site on Netlify, you don't need to do this part to install the site localy.**


### 🟥&nbsp; 1. Open a terminal and clone this repository
`git clone https://github.com/eri/Website.git` 

and then do `cd Website`

### 🟧&nbsp; 2. Install website dependencies
`pip3 install -r requirements.txt`

### 🟨&nbsp; 3. Customize the site with your own settings
Go to the `/src` folder and edit the `constants.py` file with your own settings

> **Note:** If you would like to get a static version of your site, keep `ssr` as `True`. 
>
>If you would like to run a Flask server, change `ssr` as `False`. In that case, you can set a host (IP) and a port where the website will be run. 
>
>It's recommended to keep `host` as `0.0.0.0` if the address is pointing a local address. Feel free to change the `port` as you wish.

### 🟩 &nbsp;4. Start the website
Run the `python3 run.py` command on your terminal.

### 🟦&nbsp; 5. **Your site is ready**
> If `ssr` in `constants.py` is **`False`**, a static version of the site has been generated in a new folder named `/build`.

> If `ssr` in `constants.py` is **`True`**, your site will be available at the `host:port` that you specified. (http://localhost:8000/ by default)
