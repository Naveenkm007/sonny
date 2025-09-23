from datetime import datetime
from app import db, ma

class Subject(db.Model):
    """Subject model for storing subject information"""
    __tablename__ = 'subjects'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False)
    credits = db.Column(db.Integer, default=1)
    description = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    results = db.relationship('Result', backref='subject', lazy='dynamic', cascade='all, delete-orphan')
    
    def __init__(self, name, code, credits=1, description=None):
        self.name = name
        self.code = code
        self.credits = credits
        self.description = description
    
    def get_statistics(self):
        """Get subject statistics"""
        results = self.results.filter(Result.grade.isnot(None)).all()
        
        if not results:
            return {
                'total_students': 0,
                'average_marks': 0,
                'pass_rate': 0,
                'grade_distribution': {}
            }
        
        total_marks = sum(result.marks_obtained for result in results if result.marks_obtained)
        average_marks = total_marks / len(results) if results else 0
        
        passed_students = len([r for r in results if r.grade not in ['F', 'Fail']])
        pass_rate = (passed_students / len(results)) * 100 if results else 0
        
        grade_distribution = {}
        for result in results:
            grade = result.grade
            grade_distribution[grade] = grade_distribution.get(grade, 0) + 1
        
        return {
            'total_students': len(results),
            'average_marks': round(average_marks, 2),
            'pass_rate': round(pass_rate, 2),
            'grade_distribution': grade_distribution
        }
    
    def to_dict(self):
        """Convert subject object to dictionary"""
        return {
            'id': self.id,
            'name': self.name,
            'code': self.code,
            'credits': self.credits,
            'description': self.description,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
    
    def __repr__(self):
        return f'<Subject {self.code}: {self.name}>'

class SubjectSchema(ma.SQLAlchemyAutoSchema):
    """Subject serialization schema"""
    class Meta:
        model = Subject
        load_instance = True

# Schema instances
subject_schema = SubjectSchema()
subjects_schema = SubjectSchema(many=True)
