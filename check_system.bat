@echo off
echo ================================================================
echo           Student Result Management System (SRMS)
echo                    System Health Check
echo ================================================================
echo.

REM Check Node.js
echo [CHECK 1/6] Node.js Installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Node.js is installed
    node --version | findstr /C:"v" >nul && node --version
) else (
    echo ✗ Node.js is NOT installed
    echo   Please install from: https://nodejs.org/
)

echo.

REM Check Python
echo [CHECK 2/6] Python Installation...
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Python is installed
    python --version
) else (
    echo ✗ Python is NOT installed
    echo   Please install from: https://python.org/
)

echo.

REM Check Backend Dependencies
echo [CHECK 3/6] Backend Dependencies...
if exist backend\venv (
    echo ✓ Python virtual environment exists
    if exist backend\venv\Scripts\activate (
        echo ✓ Virtual environment is properly configured
    ) else (
        echo ✗ Virtual environment is corrupted
    )
) else (
    echo ✗ Python virtual environment not found
    echo   Run install_srms.bat to create it
)

echo.

REM Check Frontend Dependencies
echo [CHECK 4/6] Frontend Dependencies...
if exist frontend\node_modules (
    echo ✓ Node.js dependencies are installed
    if exist frontend\node_modules\.bin (
        echo ✓ NPM packages are properly configured
    ) else (
        echo ⚠ Some NPM packages may be missing
    )
) else (
    echo ✗ Node.js dependencies not found
    echo   Run install_srms.bat to install them
)

echo.

REM Check Database
echo [CHECK 5/6] Database Status...
if exist backend\srms.db (
    echo ✓ Database file exists
    REM Check if database has data
    cd backend
    python -c "import sqlite3; conn=sqlite3.connect('srms.db'); cursor=conn.cursor(); cursor.execute('SELECT COUNT(*) FROM users'); count=cursor.fetchone()[0]; print(f'✓ Database contains {count} users'); conn.close()" 2>nul
    if %errorlevel% neq 0 (
        echo ⚠ Database exists but may be corrupted
        echo   Run backend\simple_init.py to rebuild
    )
    cd ..
) else (
    echo ✗ Database not found
    echo   Run backend\simple_init.py to create it
)

echo.

REM Check Ports
echo [CHECK 6/6] Port Availability...
netstat -an | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo ⚠ Port 3000 is in use (Frontend port)
) else (
    echo ✓ Port 3000 is available (Frontend)
)

netstat -an | findstr :5000 >nul
if %errorlevel% equ 0 (
    echo ⚠ Port 5000 is in use (Backend port)
) else (
    echo ✓ Port 5000 is available (Backend)
)

echo.
echo ================================================================
echo                    HEALTH CHECK COMPLETE
echo ================================================================
echo.

REM Provide recommendations
echo RECOMMENDATIONS:
echo.
if not exist backend\venv (
    echo • Run install_srms.bat to set up the system
)
if not exist backend\srms.db (
    echo • Initialize the database by running backend\simple_init.py
)
echo • If any ports are in use, close the applications using them
echo • For best performance, ensure at least 4GB RAM is available
echo.

echo Press any key to exit...
pause >nul