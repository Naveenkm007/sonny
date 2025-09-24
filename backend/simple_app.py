#!/usr/bin/env python3
"""
Simple Flask app for SRMS with basic functionality
"""
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, verify_jwt_in_request, get_jwt_identity
from flask_cors import CORS
from werkzeug.security import check_password_hash
from datetime import timedelta

# Create Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///srms.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:3000'])

# Import models
from simple_init import User, Student, Subject, Result

@app.route('/api/v1/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({'message': 'Invalid credentials'}), 401
    
    access_token = create_access_token(identity=user.id)
    user_data = {'id': user.id, 'email': user.email, 'role': user.role}
    
    return jsonify({
        'user': user_data,
        'tokens': {'access_token': access_token, 'refresh_token': access_token}
    }), 200

@app.route('/api/v1/auth/profile', methods=['GET'])
def get_profile():
    verify_jwt_in_request()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({'user': {'id': user.id, 'email': user.email, 'role': user.role}}), 200

@app.route('/', methods=['GET'])
def health():
    return jsonify({'message': 'SRMS API is running!'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)