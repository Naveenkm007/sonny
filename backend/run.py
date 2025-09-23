import os
from app import create_app, db
from app.models.user import User
from app.models.student import Student
from app.models.subject import Subject
from app.models.result import Result

# Create Flask application
app = create_app()

@app.shell_context_processor
def make_shell_context():
    """Make database models available in flask shell"""
    return {
        'db': db,
        'User': User,
        'Student': Student,
        'Subject': Subject,
        'Result': Result
    }

@app.before_first_request
def create_tables():
    """Create database tables on first request"""
    db.create_all()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
