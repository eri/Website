# Import app & constants
from src import website
from src import constants

# Import Frozen-Flask, a static site generator
from flask_frozen import Freezer


if constants.ssr == True:
    """ 
    Server Side Rendering is active

    This is useful if we need a static version of the site
    to deploy in a web server or to Netlify.

    Static files will be saved in a new /build directory

    """
    freezer = Freezer(website.app)

    if __name__ == '__main__':
        # Run the initial Flask app
        freezer.freeze()

else:
    """
    Server Side Rendering is disabled
    
    The app will be executed and run by a Flask server
    to be served dynamically.

    """
    if __name__ == '__main__':
        website.app.run(debug=False, host=constants.host, port=constants.port)
    