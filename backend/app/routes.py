from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User
from app import db
from bcrypt import hashpw, gensalt, checkpw

routes = Blueprint('routes', __name__)

@routes.route("/sign_up", methods=["POST"])
def signup():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('email') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    hashed_password = hashpw(data['password'].encode('utf-8'), gensalt())
    new_user = User(
        username=data['username'],
        email=data['email'],
        password=hashed_password.decode('utf-8')
    )
    
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User created successfully"}), 201

@routes.route("/sign_in", methods=["POST"])
def signin():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Missing required fields"}), 400
    
    user = User.query.filter_by(username=data['username']).first()
    
    if user and checkpw(data['password'].encode('utf-8'), user.password.encode('utf-8')):
        access_token = create_access_token(identity=user.username)
        return jsonify({"access_token": access_token, "message": "Sign in successful"}), 200
    else:
        return jsonify({"error": "Invalid username or password"}), 401

@routes.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}! This is a protected route."}), 200

@routes.route("/sign_out", methods=["POST"])
def signout():
    # JWT is stateless; sign out is handled on the client by deleting the token
    return jsonify({"message": "Sign out successful"}), 200