from datetime import datetime
from app import db

class Result(db.Model):
    """Result model for storing student exam results"""
    __tablename__ = 'results'
    
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey('students.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    marks_obtained = db.Column(db.Float, nullable=False)
    total_marks = db.Column(db.Float, nullable=False, default=100.0)
    grade = db.Column(db.String(5))
    percentage = db.Column(db.Float)
    semester = db.Column(db.String(20), nullable=False)
    academic_year = db.Column(db.String(20), nullable=False)
    exam_type = db.Column(db.String(50), default='Final')  # Final, Mid-term, Quiz, etc.
    remarks = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Composite unique constraint
    __table_args__ = (
        db.UniqueConstraint('student_id', 'subject_id', 'semester', 'academic_year', 'exam_type',
                          name='_student_subject_semester_exam_uc'),
    )
    
    def __init__(self, student_id, subject_id, marks_obtained, total_marks=100.0, 
                 semester=None, academic_year=None, exam_type='Final'):
        self.student_id = student_id
        self.subject_id = subject_id
        self.marks_obtained = marks_obtained
        self.total_marks = total_marks
        self.semester = semester
        self.academic_year = academic_year
        self.exam_type = exam_type
        
        # Auto-calculate percentage and grade
        self.calculate_percentage()
        self.calculate_grade()
    
    def calculate_percentage(self):
        """Calculate percentage from marks"""
        if self.total_marks and self.total_marks > 0:
            self.percentage = round((self.marks_obtained / self.total_marks) * 100, 2)
        else:
            self.percentage = 0.0
    
    def calculate_grade(self):
        """Calculate grade based on percentage"""
        if self.percentage is None:
            self.calculate_percentage()
        
        if self.percentage >= 90:
            self.grade = 'A+'
        elif self.percentage >= 80:
            self.grade = 'A'
        elif self.percentage >= 70:
            self.grade = 'B+'
        elif self.percentage >= 60:
            self.grade = 'B'
        elif self.percentage >= 50:
            self.grade = 'C+'
        elif self.percentage >= 40:
            self.grade = 'C'
        elif self.percentage >= 35:
            self.grade = 'D'
        else:
            self.grade = 'F'
    
    def is_pass(self):
        """Check if student passed this subject"""
        return self.grade != 'F' and self.percentage >= 35
    
    def get_grade_point(self):
        """Get grade point for GPA calculation"""
        grade_points = {
            'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
            'C+': 6, 'C': 5, 'D': 4, 'F': 0
        }
        return grade_points.get(self.grade, 0)
    
    def to_dict(self):
        """Convert result object to dictionary"""
        return {
            'id': self.id,
            'student_id': self.student_id,
            'subject_id': self.subject_id,
            'marks_obtained': self.marks_obtained,
            'total_marks': self.total_marks,
            'percentage': self.percentage,
            'grade': self.grade,
            'semester': self.semester,
            'academic_year': self.academic_year,
            'exam_type': self.exam_type,
            'remarks': self.remarks,
            'is_pass': self.is_pass(),
            'grade_point': self.get_grade_point(),
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Result {self.student.student_id}-{self.subject.code}: {self.grade}>'

