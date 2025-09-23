@echo off
echo Setting up Student Result Management System...

REM Create environment files
echo Creating environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env
)

if not exist frontend\.env.local (
    copy frontend\.env.example frontend\.env.local
    echo Created frontend\.env.local
)

REM Setup backend
echo Setting up backend...
cd backend
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt

REM Initialize database
echo Initializing database...
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

REM Create sample data
python scripts\create_sample_data.py

cd ..

REM Setup frontend
echo Setting up frontend...
cd frontend
npm install

cd ..

echo Setup complete!
echo.
echo To start the application:
echo 1. Backend: cd backend && venv\Scripts\activate && flask run
echo 2. Frontend: cd frontend && npm run dev
echo.
echo Or use Docker: docker-compose up
pause
