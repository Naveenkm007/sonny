from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from marshmallow import ValidationError
from app import db
from app.models.subject import Subject, subject_schema, subjects_schema
from app.utils.decorators import admin_required, admin_or_teacher_required

subjects_bp = Blueprint('subjects', __name__)

@subjects_bp.route('', methods=['GET'])
@jwt_required()
def get_subjects():
    """Get all active subjects"""
    try:
        # Get query parameters
        search = request.args.get('search', '')
        
        # Build query
        query = Subject.query.filter_by(is_active=True)
        
        if search:
            query = query.filter(
                db.or_(
                    Subject.name.contains(search),
                    Subject.code.contains(search)
                )
            )
        
        subjects = query.order_by(Subject.name).all()
        
        return jsonify({
            'subjects': subjects_schema.dump(subjects),
            'total': len(subjects)
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get subjects: {str(e)}'}), 500

@subjects_bp.route('/<int:subject_id>', methods=['GET'])
@jwt_required()
def get_subject(subject_id):
    """Get specific subject by ID"""
    try:
        subject = Subject.query.get_or_404(subject_id)
        
        # Get subject statistics
        stats = subject.get_statistics()
        
        return jsonify({
            'subject': subject_schema.dump(subject),
            'statistics': stats
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get subject: {str(e)}'}), 500

@subjects_bp.route('', methods=['POST'])
@jwt_required()
@admin_required
def create_subject():
    """Create a new subject"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['name', 'code']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if subject code already exists
        if Subject.query.filter_by(code=data['code']).first():
            return jsonify({'message': 'Subject code already exists'}), 409
        
        # Create subject
        subject = Subject(
            name=data['name'],
            code=data['code'],
            credits=data.get('credits', 1),
            description=data.get('description')
        )
        
        db.session.add(subject)
        db.session.commit()
        
        return jsonify({
            'message': 'Subject created successfully',
            'subject': subject_schema.dump(subject)
        }), 201
        
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to create subject: {str(e)}'}), 500

@subjects_bp.route('/<int:subject_id>', methods=['PUT'])
@jwt_required()
@admin_required
def update_subject(subject_id):
    """Update subject information"""
    try:
        subject = Subject.query.get_or_404(subject_id)
        
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Update subject fields
        updateable_fields = ['name', 'credits', 'description']
        
        for field in updateable_fields:
            if field in data:
                setattr(subject, field, data[field])
        
        # Handle subject code update (check uniqueness)
        if 'code' in data and data['code'] != subject.code:
            existing = Subject.query.filter_by(code=data['code']).first()
            if existing:
                return jsonify({'message': 'Subject code already exists'}), 409
            subject.code = data['code']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Subject updated successfully',
            'subject': subject_schema.dump(subject)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update subject: {str(e)}'}), 500

@subjects_bp.route('/<int:subject_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_subject(subject_id):
    """Delete (deactivate) a subject"""
    try:
        subject = Subject.query.get_or_404(subject_id)
        
        # Check if subject has any results
        if subject.results.count() > 0:
            # Soft delete - just mark as inactive
            subject.is_active = False
            db.session.commit()
            return jsonify({'message': 'Subject marked as inactive (has existing results)'}), 200
        else:
            # Hard delete if no results exist
            db.session.delete(subject)
            db.session.commit()
            return jsonify({'message': 'Subject deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete subject: {str(e)}'}), 500

@subjects_bp.route('/<int:subject_id>/results', methods=['GET'])
@jwt_required()
@admin_or_teacher_required
def get_subject_results(subject_id):
    """Get all results for a specific subject"""
    try:
        subject = Subject.query.get_or_404(subject_id)
        
        # Get query parameters
        semester = request.args.get('semester')
        academic_year = request.args.get('academic_year')
        class_name = request.args.get('class')
        
        # Build query
        query = subject.results
        
        if semester:
            query = query.filter_by(semester=semester)
        if academic_year:
            query = query.filter_by(academic_year=academic_year)
        if class_name:
            query = query.join(Subject.results).filter_by(class_name=class_name)
        
        results = query.all()
        
        # Get subject statistics
        stats = subject.get_statistics()
        
        return jsonify({
            'subject': subject_schema.dump(subject),
            'results': [result.to_dict() for result in results],
            'statistics': stats,
            'total_results': len(results)
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get subject results: {str(e)}'}), 500
