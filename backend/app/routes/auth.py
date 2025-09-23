from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    jwt_required, create_access_token, create_refresh_token,
    get_jwt_identity, get_jwt
)
from marshmallow import ValidationError
from app import db
from app.models.user import User, user_schema, users_schema
from app.models.student import Student, student_schema

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user"""
    try:
        # Get JSON data
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['email', 'password', 'role']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already registered'}), 409
        
        # Create new user
        user = User(
            email=data['email'],
            password=data['password'],
            role=data.get('role', 'student')
        )
        
        db.session.add(user)
        db.session.flush()  # Get user ID without committing
        
        # If user is a student, create student profile
        if user.role == 'student':
            student_data = data.get('student_profile', {})
            student = Student(
                user_id=user.id,
                student_id=student_data.get('student_id', f'STU{user.id:06d}'),
                first_name=student_data.get('first_name', ''),
                last_name=student_data.get('last_name', ''),
                date_of_birth=student_data.get('date_of_birth'),
                phone_number=student_data.get('phone_number'),
                address=student_data.get('address'),
                class_name=student_data.get('class_name'),
                section=student_data.get('section')
            )
            db.session.add(student)
        
        db.session.commit()
        
        # Generate tokens
        tokens = user.generate_tokens()
        
        return jsonify({
            'message': 'User registered successfully',
            'user': user.to_dict(),
            'tokens': tokens
        }), 201
        
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Registration failed: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Find user
        user = User.query.filter_by(email=email).first()
        
        if not user or not user.check_password(password):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'message': 'Account is inactive'}), 401
        
        # Generate tokens
        tokens = user.generate_tokens()
        
        # Get additional user data
        user_data = user.to_dict()
        if user.role == 'student' and user.student_profile:
            user_data['student_profile'] = user.student_profile.to_dict()
        
        return jsonify({
            'message': 'Login successful',
            'user': user_data,
            'tokens': tokens
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Login failed: {str(e)}'}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({'message': 'User not found or inactive'}), 404
        
        new_token = create_access_token(identity=current_user_id)
        
        return jsonify({
            'access_token': new_token
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Token refresh failed: {str(e)}'}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    """User logout (client-side token removal)"""
    return jsonify({'message': 'Logout successful'}), 200

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        user_data = user.to_dict()
        if user.role == 'student' and user.student_profile:
            user_data['student_profile'] = user.student_profile.to_dict()
        
        return jsonify({'user': user_data}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get profile: {str(e)}'}), 500

@auth_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    """Update current user profile"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Update user fields
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = User.query.filter_by(email=data['email']).first()
            if existing_user and existing_user.id != user.id:
                return jsonify({'message': 'Email already taken'}), 409
            user.email = data['email']
        
        # Update student profile if exists
        if user.role == 'student' and user.student_profile and 'student_profile' in data:
            student_data = data['student_profile']
            student = user.student_profile
            
            for field in ['first_name', 'last_name', 'phone_number', 'address', 'class_name', 'section']:
                if field in student_data:
                    setattr(student, field, student_data[field])
        
        db.session.commit()
        
        user_data = user.to_dict()
        if user.role == 'student' and user.student_profile:
            user_data['student_profile'] = user.student_profile.to_dict()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': user_data
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update profile: {str(e)}'}), 500
