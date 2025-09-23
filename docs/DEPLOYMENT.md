# Deployment Guide

This guide explains how to deploy the Student Result Management System (SRMS) to production.

## Prerequisites

- Python 3.8+
- Node.js 16+
- MySQL/PostgreSQL (for production database)
- Domain name and SSL certificate
- Web server (Nginx/Apache)

## Environment Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd student-result-management-system
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac
# or
venv\Scripts\activate     # Windows

# Install dependencies
pip install -r requirements.txt

# Create production environment file
cp .env.example .env
```

Edit `.env` file with production settings:

```bash
FLASK_ENV=production
SECRET_KEY=your-secure-secret-key
JWT_SECRET_KEY=your-secure-jwt-key
DATABASE_URL=mysql://user:password@localhost/srms_prod
CORS_ORIGINS=https://yourdomain.com
```

### 3. Database Setup

```bash
# Initialize database
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Create admin user
python scripts/create_admin.py
```

### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create production environment file
cp .env.example .env.local
```

Edit `.env.local`:

```bash
VITE_API_URL=https://yourdomain.com/api/v1
VITE_APP_ENV=production
```

Build for production:

```bash
npm run build
```

## Deployment Options

### Option 1: Traditional Server Deployment

#### Backend (using Gunicorn)

```bash
# Install Gunicorn
pip install gunicorn

# Run with Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 run:app
```

#### Frontend (using Nginx)

Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    # Frontend
    location / {
        root /path/to/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### Option 2: Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Option 3: Cloud Deployment

#### Heroku

Backend:
```bash
# Create Heroku app
heroku create srms-backend

# Add database addon
heroku addons:create jawsdb:kitefin

# Deploy
git subtree push --prefix=backend heroku main
```

Frontend (Netlify/Vercel):
```bash
# Build
npm run build

# Deploy dist/ folder to Netlify/Vercel
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **HTTPS**: Use SSL certificates for production
3. **Database**: Use strong passwords and restrict access
4. **CORS**: Configure specific origins, not wildcards
5. **Rate Limiting**: Implement API rate limiting
6. **Backup**: Regular database backups

## Monitoring

### Health Checks

Add health check endpoints:

```python
@app.route('/health')
def health_check():
    return {'status': 'healthy', 'timestamp': datetime.utcnow()}
```

### Logging

Configure production logging:

```python
import logging

if app.config['ENV'] == 'production':
    logging.basicConfig(level=logging.INFO)
```

## Performance Optimization

1. **Database**: Use connection pooling
2. **Caching**: Implement Redis for caching
3. **CDN**: Use CDN for static assets
4. **Compression**: Enable gzip compression
5. **Database Indexing**: Add indexes for frequently queried fields

## Backup and Recovery

### Database Backup

```bash
# MySQL backup
mysqldump -u username -p srms_prod > backup.sql

# Restore
mysql -u username -p srms_prod < backup.sql
```

### File Backup

```bash
# Backup uploaded files
tar -czf files_backup.tar.gz /path/to/uploads/
```

## Troubleshooting

### Common Issues

1. **Database Connection**: Check connection string and credentials
2. **CORS Errors**: Verify CORS_ORIGINS setting
3. **Build Failures**: Check Node.js/Python versions
4. **Permission Issues**: Verify file permissions and user access

### Logs

Check application logs:

```bash
# Backend logs
tail -f /var/log/srms/backend.log

# Frontend logs (browser console)
# Nginx logs
tail -f /var/log/nginx/access.log
```

## Maintenance

### Updates

1. Backup database and files
2. Update code repository
3. Install new dependencies
4. Run database migrations
5. Restart services
6. Verify functionality

### Database Migrations

```bash
# Generate migration
flask db migrate -m "Description of changes"

# Apply migration
flask db upgrade
```
