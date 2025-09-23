@echo off
echo Starting Student Result Management System...

REM Check if .env files exist
if not exist backend\.env (
    echo Error: backend\.env not found. Run setup.bat first.
    pause
    exit /b 1
)

if not exist frontend\.env.local (
    echo Error: frontend\.env.local not found. Run setup.bat first.
    pause
    exit /b 1
)

REM Start backend in a new window
echo Starting backend server...
start "SRMS Backend" cmd /k "cd backend && venv\Scripts\activate && flask run"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend in a new window
echo Starting frontend server...
start "SRMS Frontend" cmd /k "cd frontend && npm run dev"

echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to close this window...
pause >nul
