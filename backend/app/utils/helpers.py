"""
Utility helper functions
"""
import os
import secrets
from datetime import datetime, date
from flask import current_app

def generate_student_id():
    """Generate a unique student ID"""
    timestamp = datetime.now().strftime('%Y%m%d')
    random_suffix = secrets.token_hex(2).upper()
    return f"STU{timestamp}{random_suffix}"

def calculate_age(birth_date):
    """Calculate age from birth date"""
    if not birth_date:
        return None
    
    today = date.today()
    return today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

def format_grade_points(gpa):
    """Format GPA to 2 decimal places"""
    if gpa is None:
        return "N/A"
    return f"{gpa:.2f}"

def get_semester_from_date(date_obj=None):
    """Get current semester based on date"""
    if date_obj is None:
        date_obj = datetime.now()
    
    month = date_obj.month
    year = date_obj.year
    
    if month >= 7 and month <= 12:
        return f"Fall {year}"
    elif month >= 1 and month <= 6:
        return f"Spring {year}"
    else:
        return f"Summer {year}"

def get_academic_year(date_obj=None):
    """Get academic year based on date"""
    if date_obj is None:
        date_obj = datetime.now()
    
    year = date_obj.year
    month = date_obj.month
    
    if month >= 7:  # July onwards is next academic year
        return f"{year}-{year + 1}"
    else:
        return f"{year - 1}-{year}"

def validate_email(email):
    """Basic email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_filename(filename):
    """Sanitize filename for safe file operations"""
    import re
    # Remove or replace unsafe characters
    filename = re.sub(r'[<>:"/\\|?*]', '_', filename)
    return filename.strip()

class GradeCalculator:
    """Helper class for grade calculations"""
    
    GRADE_THRESHOLDS = {
        'A+': 90,
        'A': 80,
        'B+': 70,
        'B': 60,
        'C+': 50,
        'C': 40,
        'D': 35,
        'F': 0
    }
    
    GRADE_POINTS = {
        'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
        'C+': 6, 'C': 5, 'D': 4, 'F': 0
    }
    
    @classmethod
    def get_grade_from_percentage(cls, percentage):
        """Get grade based on percentage"""
        for grade, threshold in cls.GRADE_THRESHOLDS.items():
            if percentage >= threshold:
                return grade
        return 'F'
    
    @classmethod
    def get_grade_point(cls, grade):
        """Get grade point for GPA calculation"""
        return cls.GRADE_POINTS.get(grade, 0)
    
    @classmethod
    def calculate_gpa(cls, results):
        """Calculate GPA from results"""
        if not results:
            return 0.0
        
        total_points = 0
        total_credits = 0
        
        for result in results:
            if result.subject and result.subject.credits:
                grade_point = cls.get_grade_point(result.grade)
                total_points += grade_point * result.subject.credits
                total_credits += result.subject.credits
        
        return round(total_points / total_credits, 2) if total_credits > 0 else 0.0
