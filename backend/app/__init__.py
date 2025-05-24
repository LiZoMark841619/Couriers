from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from app.configs import Config

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app, resources={r"/*": {"origins": "*"}})
    db.init_app(app)
    
    from app.models import User
    from app.routes import routes
    app.register_blueprint(routes)
    
    return app
