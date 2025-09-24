#!/usr/bin/env python3
"""
Database initialization script for SRMS
"""
import os
import sys
from datetime import date, datetime

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import db
from app.models.user import User
from app.models.student import Student  
from app.models.subject import Subject
from app.models.result import Result
from werkzeug.security import generate_password_hash

def init_database():
    """Initialize database with tables and sample data"""
    try:
        # Create all tables
        db.create_all()
        print("✅ Database tables created successfully")
        
        # Create sample data
        create_sample_data()
        print("✅ Sample data created successfully")
        
        print("\n🎉 Database initialization completed!")
        print("\n📝 Demo Login Credentials:")
        print("Admin: admin@srms.com / admin123")
        print("Teacher: teacher@srms.com / teacher123") 
        print("Student: john.doe@student.com / student123")
        
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        db.session.rollback()
        return False
    
    return True

def create_sample_data():
    """Create sample users, students, subjects and results"""
    
    # Check if data already exists
    if User.query.first():
        print("Sample data already exists, skipping...")
        return
    
    # Create Admin User
    admin = User(
        email='admin@srms.com',
        password='admin123',
        role='admin'
    )
    db.session.add(admin)
    
    # Create Teacher User
    teacher = User(
        email='teacher@srms.com', 
        password='teacher123',
        role='teacher'
    )
    db.session.add(teacher)
    
    # Create Student Users
    student1_user = User(
        email='john.doe@student.com',
        password='student123',
        role='student'
    )
    db.session.add(student1_user)
    
    student2_user = User(
        email='jane.smith@student.com',
        password='student123', 
        role='student'
    )
    db.session.add(student2_user)
    
    student3_user = User(
        email='mike.wilson@student.com',
        password='student123',
        role='student'
    )
    db.session.add(student3_user)
    
    # Flush to get user IDs
    db.session.flush()
    
    # Create Student Profiles
    student1 = Student(
        user_id=student1_user.id,
        student_id='STU001',
        first_name='John',
        last_name='Doe',
        date_of_birth=date(2000, 5, 15),
        phone_number='123-456-7890',
        address='123 Student St, City, State',
        class_name='10A',
        section='A'
    )
    db.session.add(student1)
    
    student2 = Student(
        user_id=student2_user.id,
        student_id='STU002', 
        first_name='Jane',
        last_name='Smith',
        date_of_birth=date(2000, 8, 22),
        phone_number='123-456-7891',
        address='456 Student Ave, City, State',
        class_name='10A',
        section='A'
    )
    db.session.add(student2)
    
    student3 = Student(
        user_id=student3_user.id,
        student_id='STU003',
        first_name='Mike', 
        last_name='Wilson',
        date_of_birth=date(2000, 12, 10),
        phone_number='123-456-7892',
        address='789 Student Blvd, City, State',
        class_name='10B',
        section='B'
    )
    db.session.add(student3)
    
    # Create Subjects
    subjects_data = [
        {'name': 'Mathematics', 'code': 'MATH101', 'credits': 4, 'description': 'Advanced Mathematics'},
        {'name': 'Physics', 'code': 'PHY101', 'credits': 4, 'description': 'Basic Physics'}, 
        {'name': 'Chemistry', 'code': 'CHEM101', 'credits': 4, 'description': 'General Chemistry'},
        {'name': 'English', 'code': 'ENG101', 'credits': 3, 'description': 'English Literature'},
        {'name': 'Computer Science', 'code': 'CS101', 'credits': 3, 'description': 'Introduction to Programming'}
    ]
    
    subjects = []
    for subject_data in subjects_data:
        subject = Subject(**subject_data)
        subjects.append(subject)
        db.session.add(subject)
    
    # Flush to get student and subject IDs
    db.session.flush()
    
    # Create Sample Results
    semester = 'Fall 2024'
    academic_year = '2024-25'
    
    results_data = [
        # John Doe results
        {'student_id': student1.id, 'subject_id': subjects[0].id, 'marks': 85, 'total': 100},
        {'student_id': student1.id, 'subject_id': subjects[1].id, 'marks': 78, 'total': 100},
        {'student_id': student1.id, 'subject_id': subjects[2].id, 'marks': 92, 'total': 100},
        {'student_id': student1.id, 'subject_id': subjects[3].id, 'marks': 88, 'total': 100},
        {'student_id': student1.id, 'subject_id': subjects[4].id, 'marks': 95, 'total': 100},
        
        # Jane Smith results  
        {'student_id': student2.id, 'subject_id': subjects[0].id, 'marks': 92, 'total': 100},
        {'student_id': student2.id, 'subject_id': subjects[1].id, 'marks': 87, 'total': 100},
        {'student_id': student2.id, 'subject_id': subjects[2].id, 'marks': 89, 'total': 100},
        {'student_id': student2.id, 'subject_id': subjects[3].id, 'marks': 94, 'total': 100},
        {'student_id': student2.id, 'subject_id': subjects[4].id, 'marks': 91, 'total': 100},
        
        # Mike Wilson results
        {'student_id': student3.id, 'subject_id': subjects[0].id, 'marks': 76, 'total': 100},
        {'student_id': student3.id, 'subject_id': subjects[1].id, 'marks': 82, 'total': 100},
        {'student_id': student3.id, 'subject_id': subjects[2].id, 'marks': 79, 'total': 100},
        {'student_id': student3.id, 'subject_id': subjects[3].id, 'marks': 85, 'total': 100},
        {'student_id': student3.id, 'subject_id': subjects[4].id, 'marks': 88, 'total': 100},
    ]
    
    for result_data in results_data:
        result = Result(
            student_id=result_data['student_id'],
            subject_id=result_data['subject_id'],
            marks_obtained=result_data['marks'],
            total_marks=result_data['total'],
            semester=semester,
            academic_year=academic_year
        )
        db.session.add(result)
    
    # Commit all changes
    db.session.commit()

if __name__ == '__main__':
    from app import create_app
    
    app = create_app()
    with app.app_context():
        init_database()