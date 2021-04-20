# Import Frozen-Flask, a static site generator
from flask_frozen import Freezer

# Import my Flask App
import app

freezer = Freezer(app)

if __name__ == '__main__':
    # Run the initial Flask app
    freezer.freeze()