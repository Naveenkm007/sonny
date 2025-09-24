# Models package
# Import all models to ensure proper relationship registration
from app.models.user import User
from app.models.student import Student
from app.models.subject import Subject
from app.models.result import Result

__all__ = ['User', 'Student', 'Subject', 'Result']
