from flask import Flask
from flask_cors import CORS
from app.settings import logger
from app.configs import Config

app = Flask(__name__)

app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "*"}})

from app import routes


