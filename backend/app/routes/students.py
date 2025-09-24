from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.student import Student
from app.utils.decorators import admin_required, admin_or_teacher_required

students_bp = Blueprint('students', __name__)

@students_bp.route('', methods=['GET'])
@jwt_required()
@admin_or_teacher_required
def get_students():
    """Get all students with pagination and filtering"""
    try:
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        search = request.args.get('search', '')
        class_name = request.args.get('class', '')
        section = request.args.get('section', '')
        
        # Build query
        query = Student.query.filter_by(is_active=True)
        
        # Apply filters
        if search:
            query = query.filter(
                db.or_(
                    Student.first_name.contains(search),
                    Student.last_name.contains(search),
                    Student.student_id.contains(search)
                )
            )
        
        if class_name:
            query = query.filter_by(class_name=class_name)
        
        if section:
            query = query.filter_by(section=section)
        
        # Paginate results
        students = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'students': students_schema.dump(students.items),
            'pagination': {
                'page': students.page,
                'pages': students.pages,
                'per_page': students.per_page,
                'total': students.total,
                'has_next': students.has_next,
                'has_prev': students.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get students: {str(e)}'}), 500

@students_bp.route('/<int:student_id>', methods=['GET'])
@jwt_required()
def get_student(student_id):
    """Get specific student by ID"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        student = Student.query.get_or_404(student_id)
        
        # Students can only view their own profile
        if current_user.role == 'student' and student.user_id != current_user_id:
            return jsonify({'message': 'Access denied'}), 403
        
        return jsonify({'student': student_schema.dump(student)}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get student: {str(e)}'}), 500

@students_bp.route('', methods=['POST'])
@jwt_required()
@admin_required
def create_student():
    """Create a new student"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['email', 'password', 'first_name', 'last_name', 'student_id']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if email or student_id already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already exists'}), 409
            
        if Student.query.filter_by(student_id=data['student_id']).first():
            return jsonify({'message': 'Student ID already exists'}), 409
        
        # Create user account
        user = User(
            email=data['email'],
            password=data['password'],
            role='student'
        )
        db.session.add(user)
        db.session.flush()
        
        # Create student profile
        student = Student(
            user_id=user.id,
            student_id=data['student_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=data.get('date_of_birth'),
            phone_number=data.get('phone_number'),
            address=data.get('address'),
            class_name=data.get('class_name'),
            section=data.get('section')
        )
        
        db.session.add(student)
        db.session.commit()
        
        return jsonify({
            'message': 'Student created successfully',
            'student': student_schema.dump(student)
        }), 201
        
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to create student: {str(e)}'}), 500

@students_bp.route('/<int:student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
    """Update student information"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        student = Student.query.get_or_404(student_id)
        
        # Check permissions
        if current_user.role == 'student' and student.user_id != current_user_id:
            return jsonify({'message': 'Access denied'}), 403
        
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Update student fields
        updateable_fields = [
            'first_name', 'last_name', 'date_of_birth', 'phone_number',
            'address', 'class_name', 'section'
        ]
        
        for field in updateable_fields:
            if field in data:
                setattr(student, field, data[field])
        
        # Only admin can update student_id
        if current_user.role == 'admin' and 'student_id' in data:
            # Check if new student_id already exists
            existing = Student.query.filter_by(student_id=data['student_id']).first()
            if existing and existing.id != student.id:
                return jsonify({'message': 'Student ID already exists'}), 409
            student.student_id = data['student_id']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Student updated successfully',
            'student': student_schema.dump(student)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update student: {str(e)}'}), 500

@students_bp.route('/<int:student_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_student(student_id):
    """Delete (deactivate) a student"""
    try:
        student = Student.query.get_or_404(student_id)
        
        # Soft delete - just mark as inactive
        student.is_active = False
        student.user.is_active = False
        
        db.session.commit()
        
        return jsonify({'message': 'Student deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete student: {str(e)}'}), 500

@students_bp.route('/<int:student_id>/results', methods=['GET'])
@jwt_required()
def get_student_results(student_id):
    """Get results for a specific student"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        student = Student.query.get_or_404(student_id)
        
        # Students can only view their own results
        if current_user.role == 'student' and student.user_id != current_user_id:
            return jsonify({'message': 'Access denied'}), 403
        
        # Get query parameters
        semester = request.args.get('semester')
        academic_year = request.args.get('academic_year')
        
        # Build query
        query = student.results
        
        if semester:
            query = query.filter_by(semester=semester)
        if academic_year:
            query = query.filter_by(academic_year=academic_year)
        
        results = query.all()
        
        # Calculate GPA
        gpa = student.calculate_gpa(semester) if semester else student.calculate_gpa()
        
        return jsonify({
            'student': student_schema.dump(student),
            'results': [result.to_dict() for result in results],
            'gpa': gpa,
            'total_results': len(results)
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get student results: {str(e)}'}), 500

@students_bp.route('/classes', methods=['GET'])
@jwt_required()
@admin_or_teacher_required
def get_classes():
    """Get list of available classes"""
    try:
        classes = db.session.query(Student.class_name).filter(
            Student.class_name.isnot(None),
            Student.is_active == True
        ).distinct().all()
        
        class_list = [c[0] for c in classes if c[0]]
        
        return jsonify({'classes': class_list}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get classes: {str(e)}'}), 500
