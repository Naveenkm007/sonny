from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from config.config import Config

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()
cors = CORS()
ma = Marshmallow()

def create_app(config_class=Config):
    """Application factory pattern"""
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions with app
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)
    ma.init_app(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.students import students_bp
    from app.routes.subjects import subjects_bp
    from app.routes.results import results_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/v1/auth')
    app.register_blueprint(students_bp, url_prefix='/api/v1/students')
    app.register_blueprint(subjects_bp, url_prefix='/api/v1/subjects')
    app.register_blueprint(results_bp, url_prefix='/api/v1/results')
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'message': 'Resource not found'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'message': 'Internal server error'}, 500
    
    return app
