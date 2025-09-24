#!/usr/bin/env python3
"""
Simple database initialization script for SRMS
"""
import os
import sys
from datetime import date

# Add the backend directory to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Set Flask environment
os.environ['FLASK_APP'] = 'run.py'

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash

# Create Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///srms.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'dev-secret-key'

# Initialize database
db = SQLAlchemy(app)

# Define simple models
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.String(20), nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    student_id = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    date_of_birth = db.Column(db.Date)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.Text)
    class_name = db.Column(db.String(50))
    section = db.Column(db.String(10))
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    credits = db.Column(db.Integer, default=1)
    description = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class Result(db.Model):
    __tablename__ = 'results'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    marks_obtained = db.Column(db.Float, nullable=False)
    total_marks = db.Column(db.Float, nullable=False, default=100.0)
    percentage = db.Column(db.Float)
    grade = db.Column(db.String(5))
    semester = db.Column(db.String(20), nullable=False)
    academic_year = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

def calculate_grade(percentage):
    """Calculate grade based on percentage"""
    if percentage >= 90:
        return 'A+'
    elif percentage >= 80:
        return 'A'
    elif percentage >= 70:
        return 'B+'
    elif percentage >= 60:
        return 'B'
    elif percentage >= 50:
        return 'C+'
    elif percentage >= 40:
        return 'C'
    elif percentage >= 35:
        return 'D'
    else:
        return 'F'

def init_database():
    """Initialize database with tables and sample data"""
    with app.app_context():
        try:
            # Drop and recreate all tables
            db.drop_all()
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
    
    # Create Admin User
    admin = User(
        email='admin@srms.com',
        password_hash=generate_password_hash('admin123'),
        role='admin'
    )
    db.session.add(admin)
    
    # Create Teacher User
    teacher = User(
        email='teacher@srms.com', 
        password_hash=generate_password_hash('teacher123'),
        role='teacher'
    )
    db.session.add(teacher)
    
    # Create Student Users
    student1_user = User(
        email='john.doe@student.com',
        password_hash=generate_password_hash('student123'),
        role='student'
    )
    db.session.add(student1_user)
    
    student2_user = User(
        email='jane.smith@student.com',
        password_hash=generate_password_hash('student123'),
        role='student'
    )
    db.session.add(student2_user)
    
    student3_user = User(
        email='mike.wilson@student.com',
        password_hash=generate_password_hash('student123'),
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
        percentage = (result_data['marks'] / result_data['total']) * 100
        grade = calculate_grade(percentage)
        
        result = Result(
            student_id=result_data['student_id'],
            subject_id=result_data['subject_id'],
            marks_obtained=result_data['marks'],
            total_marks=result_data['total'],
            percentage=percentage,
            grade=grade,
            semester=semester,
            academic_year=academic_year
        )
        db.session.add(result)
    
    # Commit all changes
    db.session.commit()

if __name__ == '__main__':
    init_database()