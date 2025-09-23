from datetime import datetime, date
from app import db, ma
from marshmallow import fields

class Student(db.Model):
    """Student model for storing student information"""
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
    admission_date = db.Column(db.Date, default=date.today)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    results = db.relationship('Result', backref='student', lazy='dynamic', cascade='all, delete-orphan')
    
    def __init__(self, user_id, student_id, first_name, last_name, **kwargs):
        self.user_id = user_id
        self.student_id = student_id
        self.first_name = first_name
        self.last_name = last_name
        for key, value in kwargs.items():
            setattr(self, key, value)
    
    @property
    def full_name(self):
        """Get student's full name"""
        return f"{self.first_name} {self.last_name}"
    
    def get_results_by_semester(self, semester):
        """Get student results for a specific semester"""
        return self.results.filter_by(semester=semester).all()
    
    def calculate_gpa(self, semester=None):
        """Calculate GPA for a semester or overall"""
        if semester:
            results = self.results.filter_by(semester=semester).all()
        else:
            results = self.results.all()
        
        if not results:
            return 0.0
        
        total_points = 0
        total_credits = 0
        
        grade_points = {'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0}
        
        for result in results:
            if result.grade in grade_points and result.subject.credits:
                total_points += grade_points[result.grade] * result.subject.credits
                total_credits += result.subject.credits
        
        return round(total_points / total_credits, 2) if total_credits > 0 else 0.0
    
    def to_dict(self):
        """Convert student object to dictionary"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'student_id': self.student_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'full_name': self.full_name,
            'date_of_birth': self.date_of_birth.isoformat() if self.date_of_birth else None,
            'phone_number': self.phone_number,
            'address': self.address,
            'class_name': self.class_name,
            'section': self.section,
            'admission_date': self.admission_date.isoformat() if self.admission_date else None,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Student {self.student_id}: {self.full_name}>'

class StudentSchema(ma.SQLAlchemyAutoSchema):
    """Student serialization schema"""
    class Meta:
        model = Student
        load_instance = True
        include_fk = True
    
    full_name = fields.Method("get_full_name")
    
    def get_full_name(self, obj):
        return obj.full_name

# Schema instances
student_schema = StudentSchema()
students_schema = StudentSchema(many=True)
