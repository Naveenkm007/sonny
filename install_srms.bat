@echo off
echo ================================================================
echo           Student Result Management System (SRMS)
echo                    Setup and Installation
echo ================================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js from https://nodejs.org/
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python from https://python.org/
    echo Press any key to exit...
    pause >nul
    exit /b 1
)

echo [INFO] Prerequisites check passed!
echo.

echo [STEP 1/4] Setting up backend environment...
cd backend
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate

echo Installing Python dependencies...
pip install -q -r requirements.txt

echo Initializing database...
python simple_init.py

cd ..

echo [STEP 2/4] Setting up frontend environment...
cd frontend
echo Installing Node.js dependencies...
npm install --silent

cd ..

echo [STEP 3/4] Creating environment files...
if not exist backend\.env (
    echo Creating backend environment file...
    echo FLASK_APP=simple_app.py > backend\.env
    echo FLASK_ENV=development >> backend\.env
    echo SECRET_KEY=srms-secret-key-2024 >> backend\.env
    echo JWT_SECRET_KEY=srms-jwt-secret-2024 >> backend\.env
    echo DATABASE_URL=sqlite:///srms.db >> backend\.env
    echo CORS_ORIGINS=http://localhost:3000 >> backend\.env
)

if not exist frontend\.env.local (
    echo Creating frontend environment file...
    echo VITE_API_URL=http://localhost:5000 > frontend\.env.local
    echo VITE_APP_NAME=SRMS >> frontend\.env.local
)

echo [STEP 4/4] Creating desktop shortcuts...
echo Creating SRMS shortcuts on desktop...

REM Create backend start script
echo @echo off > start_backend.bat
echo echo Starting SRMS Backend Server... >> start_backend.bat
echo cd backend >> start_backend.bat
echo call venv\Scripts\activate >> start_backend.bat
echo python simple_app.py >> start_backend.bat

REM Create frontend start script
echo @echo off > start_frontend.bat
echo echo Starting SRMS Frontend Application... >> start_frontend.bat
echo cd frontend >> start_frontend.bat
echo npm run dev >> start_frontend.bat

REM Create main launcher
echo @echo off > launch_srms.bat
echo echo ================================================================ >> launch_srms.bat
echo echo           Student Result Management System (SRMS) >> launch_srms.bat
echo echo                      Starting Application >> launch_srms.bat
echo echo ================================================================ >> launch_srms.bat
echo echo. >> launch_srms.bat
echo echo [INFO] Starting Backend Server... >> launch_srms.bat
echo start "SRMS Backend" cmd /k "start_backend.bat" >> launch_srms.bat
echo timeout /t 3 /nobreak ^>nul >> launch_srms.bat
echo echo [INFO] Starting Frontend Application... >> launch_srms.bat
echo start "SRMS Frontend" cmd /k "start_frontend.bat" >> launch_srms.bat
echo echo. >> launch_srms.bat
echo echo [SUCCESS] SRMS is starting up! >> launch_srms.bat
echo echo Frontend will be available at: http://localhost:3000 >> launch_srms.bat
echo echo Backend API available at: http://localhost:5000 >> launch_srms.bat
echo echo. >> launch_srms.bat
echo echo Demo Login Credentials: >> launch_srms.bat
echo echo Admin: admin@srms.com / admin123 >> launch_srms.bat
echo echo Teacher: teacher@srms.com / teacher123 >> launch_srms.bat
echo echo Student: john.doe@student.com / student123 >> launch_srms.bat
echo echo. >> launch_srms.bat
echo pause >> launch_srms.bat

REM Copy shortcut to desktop
if exist "%USERPROFILE%\Desktop" (
    copy launch_srms.bat "%USERPROFILE%\Desktop\Launch SRMS.bat" >nul 2>&1
    echo Desktop shortcut created: Launch SRMS.bat
)

echo.
echo ================================================================
echo                    INSTALLATION COMPLETE!
echo ================================================================
echo.
echo The Student Result Management System has been successfully installed!
echo.
echo TO START THE APPLICATION:
echo 1. Double-click "Launch SRMS.bat" on your desktop, OR
echo 2. Run "launch_srms.bat" from this folder
echo.
echo The application will be available at: http://localhost:3000
echo.
echo DEMO CREDENTIALS:
echo   Admin: admin@srms.com / admin123
echo   Teacher: teacher@srms.com / teacher123  
echo   Student: john.doe@student.com / student123
echo.
echo ================================================================
echo.
echo Would you like to start the application now? (Y/N)
set /p choice=
if /i "%choice%"=="Y" (
    echo Starting SRMS...
    call launch_srms.bat
) else (
    echo You can start the application anytime by running launch_srms.bat
)

echo.
echo Press any key to exit...
pause >nul