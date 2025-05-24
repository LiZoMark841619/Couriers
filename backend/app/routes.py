from flask import Blueprint
from flask import request, jsonify
from app.models import User
from app import db

routes = Blueprint('routes', __name__)

@routes.route("/sign_up", methods=["POST"])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=data['password']
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 201

@routes.route("/sign_in", methods=["POST"])
def signin():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    user = User.query.filter_by(username=data['username'], password=data['password']).first()
    
    if user:
        return jsonify({"message": "Sign in successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401
    
@routes.route("/sign_out", methods=["POST"])
def signout():
    db.session.clear()
    return jsonify({"message": "Sign out successful"}), 200