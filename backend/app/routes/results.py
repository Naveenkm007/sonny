from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from marshmallow import ValidationError
from app import db
from app.models.user import User
from app.models.student import Student
from app.models.subject import Subject
from app.models.result import Result, result_schema, results_schema
from app.utils.decorators import admin_required, admin_or_teacher_required

results_bp = Blueprint('results', __name__)

@results_bp.route('', methods=['GET'])
@jwt_required()
@admin_or_teacher_required
def get_results():
    """Get all results with filtering"""
    try:
        # Get query parameters
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        student_id = request.args.get('student_id', type=int)
        subject_id = request.args.get('subject_id', type=int)
        semester = request.args.get('semester')
        academic_year = request.args.get('academic_year')
        class_name = request.args.get('class')
        grade = request.args.get('grade')
        
        # Build query
        query = Result.query
        
        # Apply filters
        if student_id:
            query = query.filter_by(student_id=student_id)
        
        if subject_id:
            query = query.filter_by(subject_id=subject_id)
        
        if semester:
            query = query.filter_by(semester=semester)
            
        if academic_year:
            query = query.filter_by(academic_year=academic_year)
            
        if grade:
            query = query.filter_by(grade=grade)
            
        if class_name:
            query = query.join(Student).filter(Student.class_name == class_name)
        
        # Order by most recent
        query = query.order_by(Result.created_at.desc())
        
        # Paginate results
        results = query.paginate(
            page=page, per_page=per_page, error_out=False
        )
        
        return jsonify({
            'results': results_schema.dump(results.items),
            'pagination': {
                'page': results.page,
                'pages': results.pages,
                'per_page': results.per_page,
                'total': results.total,
                'has_next': results.has_next,
                'has_prev': results.has_prev
            }
        }), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get results: {str(e)}'}), 500

@results_bp.route('/<int:result_id>', methods=['GET'])
@jwt_required()
def get_result(result_id):
    """Get specific result by ID"""
    try:
        current_user_id = get_jwt_identity()
        current_user = User.query.get(current_user_id)
        
        result = Result.query.get_or_404(result_id)
        
        # Students can only view their own results
        if current_user.role == 'student':
            if not current_user.student_profile or current_user.student_profile.id != result.student_id:
                return jsonify({'message': 'Access denied'}), 403
        
        return jsonify({'result': result_schema.dump(result)}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get result: {str(e)}'}), 500

@results_bp.route('', methods=['POST'])
@jwt_required()
@admin_or_teacher_required
def create_result():
    """Create a new result"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Validate required fields
        required_fields = ['student_id', 'subject_id', 'marks_obtained', 'semester', 'academic_year']
        for field in required_fields:
            if field not in data:
                return jsonify({'message': f'{field} is required'}), 400
        
        # Validate student and subject exist
        student = Student.query.get(data['student_id'])
        if not student:
            return jsonify({'message': 'Student not found'}), 404
            
        subject = Subject.query.get(data['subject_id'])
        if not subject:
            return jsonify({'message': 'Subject not found'}), 404
        
        # Check if result already exists for this combination
        existing_result = Result.query.filter_by(
            student_id=data['student_id'],
            subject_id=data['subject_id'],
            semester=data['semester'],
            academic_year=data['academic_year'],
            exam_type=data.get('exam_type', 'Final')
        ).first()
        
        if existing_result:
            return jsonify({'message': 'Result already exists for this student, subject, and semester'}), 409
        
        # Validate marks
        total_marks = data.get('total_marks', 100.0)
        if data['marks_obtained'] > total_marks:
            return jsonify({'message': 'Marks obtained cannot be greater than total marks'}), 400
        
        # Create result
        result = Result(
            student_id=data['student_id'],
            subject_id=data['subject_id'],
            marks_obtained=data['marks_obtained'],
            total_marks=total_marks,
            semester=data['semester'],
            academic_year=data['academic_year'],
            exam_type=data.get('exam_type', 'Final')
        )
        
        if 'remarks' in data:
            result.remarks = data['remarks']
        
        db.session.add(result)
        db.session.commit()
        
        return jsonify({
            'message': 'Result created successfully',
            'result': result_schema.dump(result)
        }), 201
        
    except ValidationError as e:
        return jsonify({'message': 'Validation error', 'errors': e.messages}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to create result: {str(e)}'}), 500

@results_bp.route('/<int:result_id>', methods=['PUT'])
@jwt_required()
@admin_or_teacher_required
def update_result(result_id):
    """Update result information"""
    try:
        result = Result.query.get_or_404(result_id)
        
        data = request.get_json()
        if not data:
            return jsonify({'message': 'No data provided'}), 400
        
        # Update marks and recalculate grade
        if 'marks_obtained' in data:
            if data['marks_obtained'] > result.total_marks:
                return jsonify({'message': 'Marks obtained cannot be greater than total marks'}), 400
            result.marks_obtained = data['marks_obtained']
            result.calculate_percentage()
            result.calculate_grade()
        
        if 'total_marks' in data:
            result.total_marks = data['total_marks']
            result.calculate_percentage()
            result.calculate_grade()
        
        if 'remarks' in data:
            result.remarks = data['remarks']
        
        # Update semester and academic year if provided
        if 'semester' in data:
            result.semester = data['semester']
        
        if 'academic_year' in data:
            result.academic_year = data['academic_year']
        
        db.session.commit()
        
        return jsonify({
            'message': 'Result updated successfully',
            'result': result_schema.dump(result)
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to update result: {str(e)}'}), 500

@results_bp.route('/<int:result_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_result(result_id):
    """Delete a result"""
    try:
        result = Result.query.get_or_404(result_id)
        
        db.session.delete(result)
        db.session.commit()
        
        return jsonify({'message': 'Result deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Failed to delete result: {str(e)}'}), 500

@results_bp.route('/bulk', methods=['POST'])
@jwt_required()
@admin_or_teacher_required
def create_bulk_results():
    """Create multiple results at once"""
    try:
        data = request.get_json()
        
        if not data or 'results' not in data:
            return jsonify({'message': 'No results data provided'}), 400
        
        results_data = data['results']
        if not isinstance(results_data, list):
            return jsonify({'message': 'Results must be an array'}), 400
        
        created_results = []
        errors = []
        
        for i, result_data in enumerate(results_data):
            try:
                # Validate required fields
                required_fields = ['student_id', 'subject_id', 'marks_obtained', 'semester', 'academic_year']
                for field in required_fields:
                    if field not in result_data:
                        errors.append(f'Row {i+1}: {field} is required')
                        continue
                
                if errors:
                    continue
                
                # Check if result already exists
                existing_result = Result.query.filter_by(
                    student_id=result_data['student_id'],
                    subject_id=result_data['subject_id'],
                    semester=result_data['semester'],
                    academic_year=result_data['academic_year'],
                    exam_type=result_data.get('exam_type', 'Final')
                ).first()
                
                if existing_result:
                    errors.append(f'Row {i+1}: Result already exists')
                    continue
                
                # Create result
                result = Result(
                    student_id=result_data['student_id'],
                    subject_id=result_data['subject_id'],
                    marks_obtained=result_data['marks_obtained'],
                    total_marks=result_data.get('total_marks', 100.0),
                    semester=result_data['semester'],
                    academic_year=result_data['academic_year'],
                    exam_type=result_data.get('exam_type', 'Final')
                )
                
                if 'remarks' in result_data:
                    result.remarks = result_data['remarks']
                
                db.session.add(result)
                created_results.append(result)
                
            except Exception as e:
                errors.append(f'Row {i+1}: {str(e)}')
        
        if created_results:
            db.session.commit()
        
        return jsonify({
            'message': f'Bulk operation completed. {len(created_results)} results created.',
            'created_count': len(created_results),
            'errors': errors,
            'results': results_schema.dump(created_results)
        }), 201 if created_results else 400
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Bulk operation failed: {str(e)}'}), 500

@results_bp.route('/analytics', methods=['GET'])
@jwt_required()
@admin_or_teacher_required
def get_analytics():
    """Get results analytics"""
    try:
        # Get query parameters
        semester = request.args.get('semester')
        academic_year = request.args.get('academic_year')
        class_name = request.args.get('class')
        
        # Build base query
        query = Result.query
        
        if semester:
            query = query.filter_by(semester=semester)
        if academic_year:
            query = query.filter_by(academic_year=academic_year)
        if class_name:
            query = query.join(Student).filter(Student.class_name == class_name)
        
        results = query.all()
        
        if not results:
            return jsonify({
                'message': 'No results found for the specified criteria',
                'analytics': {}
            }), 200
        
        # Calculate analytics
        total_results = len(results)
        total_marks = sum(r.marks_obtained for r in results)
        average_marks = total_marks / total_results
        
        # Grade distribution
        grade_distribution = {}
        for result in results:
            grade = result.grade
            grade_distribution[grade] = grade_distribution.get(grade, 0) + 1
        
        # Pass/Fail statistics
        passed = sum(1 for r in results if r.is_pass())
        failed = total_results - passed
        pass_rate = (passed / total_results) * 100
        
        # Subject-wise performance
        subject_performance = {}
        for result in results:
            subject_name = result.subject.name
            if subject_name not in subject_performance:
                subject_performance[subject_name] = {
                    'total_students': 0,
                    'total_marks': 0,
                    'average_marks': 0,
                    'pass_rate': 0,
                    'passed': 0
                }
            
            subject_performance[subject_name]['total_students'] += 1
            subject_performance[subject_name]['total_marks'] += result.marks_obtained
            if result.is_pass():
                subject_performance[subject_name]['passed'] += 1
        
        # Calculate averages and pass rates for subjects
        for subject_name, stats in subject_performance.items():
            stats['average_marks'] = round(stats['total_marks'] / stats['total_students'], 2)
            stats['pass_rate'] = round((stats['passed'] / stats['total_students']) * 100, 2)
            del stats['total_marks']  # Remove intermediate calculation
        
        analytics = {
            'total_results': total_results,
            'average_marks': round(average_marks, 2),
            'pass_rate': round(pass_rate, 2),
            'passed_students': passed,
            'failed_students': failed,
            'grade_distribution': grade_distribution,
            'subject_performance': subject_performance
        }
        
        return jsonify({'analytics': analytics}), 200
        
    except Exception as e:
        return jsonify({'message': f'Failed to get analytics: {str(e)}'}), 500
