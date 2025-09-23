#!/bin/bash

echo "Starting Student Result Management System..."

# Check if .env files exist
if [ ! -f backend/.env ]; then
    echo "Error: backend/.env not found. Run setup.sh first."
    exit 1
fi

if [ ! -f frontend/.env.local ]; then
    echo "Error: frontend/.env.local not found. Run setup.sh first."
    exit 1
fi

# Function to cleanup background processes
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap cleanup function on script exit
trap cleanup EXIT

# Start backend
echo "Starting backend server..."
cd backend
source venv/bin/activate
flask run &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo "Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "Both servers are running:"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers..."

# Wait for user to press Ctrl+C
wait
