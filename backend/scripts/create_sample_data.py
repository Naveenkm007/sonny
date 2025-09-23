#!/usr/bin/env python3
"""
Script to create sample data for the Student Result Management System
"""

import os
import sys
from datetime import date, datetime

# Add the parent directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import create_app, db
from app.models.user import User
from app.models.student import Student
from app.models.subject import Subject
from app.models.result import Result

def create_sample_data():
    """Create sample data for testing"""
    
    app = create_app()
    
    with app.app_context():
        print("Creating sample data...")
        
        # Create admin user
        if not User.query.filter_by(email='admin@srms.com').first():
            admin = User(
                email='admin@srms.com',
                password='admin123',
                role='admin'
            )
            db.session.add(admin)
            print("Created admin user")
        
        # Create teacher user
        if not User.query.filter_by(email='teacher@srms.com').first():
            teacher = User(
                email='teacher@srms.com',
                password='teacher123',
                role='teacher'
            )
            db.session.add(teacher)
            print("Created teacher user")
        
        # Create sample subjects
        subjects_data = [
            {'name': 'Mathematics', 'code': 'MATH101', 'credits': 4},
            {'name': 'Physics', 'code': 'PHY101', 'credits': 4},
            {'name': 'Chemistry', 'code': 'CHEM101', 'credits': 4},
            {'name': 'English', 'code': 'ENG101', 'credits': 3},
            {'name': 'Computer Science', 'code': 'CS101', 'credits': 4},
        ]
        
        created_subjects = []
        for subject_data in subjects_data:
            if not Subject.query.filter_by(code=subject_data['code']).first():
                subject = Subject(**subject_data)
                db.session.add(subject)
                created_subjects.append(subject)
        
        db.session.flush()  # Get IDs for subjects
        
        if created_subjects:
            print(f"Created {len(created_subjects)} subjects")
        
        # Create sample students
        students_data = [
            {
                'email': 'john.doe@student.com',
                'first_name': 'John',
                'last_name': 'Doe',
                'student_id': 'STU001',
                'class_name': '10th Grade',
                'section': 'A'
            },
            {
                'email': 'jane.smith@student.com',
                'first_name': 'Jane',
                'last_name': 'Smith',
                'student_id': 'STU002',
                'class_name': '10th Grade',
                'section': 'A'
            },
            {
                'email': 'bob.johnson@student.com',
                'first_name': 'Bob',
                'last_name': 'Johnson',
                'student_id': 'STU003',
                'class_name': '10th Grade',
                'section': 'B'
            },
        ]
        
        created_students = []
        for student_data in students_data:
            if not User.query.filter_by(email=student_data['email']).first():
                # Create user account
                user = User(
                    email=student_data['email'],
                    password='student123',
                    role='student'
                )
                db.session.add(user)
                db.session.flush()  # Get user ID
                
                # Create student profile
                student = Student(
                    user_id=user.id,
                    student_id=student_data['student_id'],
                    first_name=student_data['first_name'],
                    last_name=student_data['last_name'],
                    class_name=student_data['class_name'],
                    section=student_data['section'],
                    date_of_birth=date(2005, 1, 1)
                )
                db.session.add(student)
                created_students.append(student)
        
        db.session.flush()  # Get student IDs
        
        if created_students:
            print(f"Created {len(created_students)} students")
        
        # Create sample results
        all_subjects = Subject.query.all()
        all_students = Student.query.all()
        
        sample_results = []
        for student in all_students:
            for subject in all_subjects:
                # Check if result already exists
                existing = Result.query.filter_by(
                    student_id=student.id,
                    subject_id=subject.id,
                    semester='Fall 2024',
                    academic_year='2024-2025'
                ).first()
                
                if not existing:
                    # Generate random marks (for demo)
                    import random
                    marks = random.randint(60, 95)
                    
                    result = Result(
                        student_id=student.id,
                        subject_id=subject.id,
                        marks_obtained=marks,
                        total_marks=100,
                        semester='Fall 2024',
                        academic_year='2024-2025'
                    )
                    sample_results.append(result)
                    db.session.add(result)
        
        if sample_results:
            print(f"Created {len(sample_results)} sample results")
        
        # Commit all changes
        db.session.commit()
        print("Sample data created successfully!")
        
        # Print login credentials
        print("\n" + "="*50)
        print("LOGIN CREDENTIALS:")
        print("="*50)
        print("Admin:")
        print("  Email: admin@srms.com")
        print("  Password: admin123")
        print("\nTeacher:")
        print("  Email: teacher@srms.com")
        print("  Password: teacher123")
        print("\nStudents:")
        for student_data in students_data:
            print(f"  Email: {student_data['email']}")
            print(f"  Password: student123")
        print("="*50)

if __name__ == '__main__':
    create_sample_data()
