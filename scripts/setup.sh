#!/bin/bash

echo "Setting up Student Result Management System..."

# Create environment files
echo "Creating environment files..."
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo "Created backend/.env"
fi

if [ ! -f frontend/.env.local ]; then
    cp frontend/.env.example frontend/.env.local
    echo "Created frontend/.env.local"
fi

# Setup backend
echo "Setting up backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Initialize database
echo "Initializing database..."
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Create sample data
python scripts/create_sample_data.py

cd ..

# Setup frontend
echo "Setting up frontend..."
cd frontend
npm install

cd ..

echo "Setup complete!"
echo ""
echo "To start the application:"
echo "1. Backend: cd backend && source venv/bin/activate && flask run"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Or use Docker: docker-compose up"
