# Import app & constants
import website
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
    @website.ssr.register_generator
    def social_redirect():
        for social in constants.social_metadata:
            yield {'name': social}

    if __name__ == '__main__':
        # Run the initial Flask app
        website.ssr.freeze()

else:
    """
    Server Side Rendering is disabled
    
    The app will be executed and run by a Flask server
    to be served dynamically.

    """
    if __name__ == '__main__':
        website.app.run(debug=True, host=constants.host, port=constants.port)
    