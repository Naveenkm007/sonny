@echo off
echo ================================================================
echo           Student Result Management System (SRMS)
echo                        Uninstaller
echo ================================================================
echo.

echo WARNING: This will remove all SRMS files and data!
echo.
set /p confirm=Are you sure you want to uninstall SRMS? (Y/N): 

if /i not "%confirm%"=="Y" (
    echo Uninstallation cancelled.
    pause
    exit /b 0
)

echo.
echo [INFO] Starting uninstallation process...

REM Stop any running SRMS processes
echo [STEP 1/4] Stopping SRMS processes...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im python.exe >nul 2>&1

REM Remove desktop shortcuts
echo [STEP 2/4] Removing desktop shortcuts...
if exist "%USERPROFILE%\Desktop\Launch SRMS.bat" (
    del "%USERPROFILE%\Desktop\Launch SRMS.bat" >nul 2>&1
    echo Desktop shortcut removed.
)

REM Remove launcher files
echo [STEP 3/4] Removing application files...
if exist launch_srms.bat del launch_srms.bat >nul 2>&1
if exist start_backend.bat del start_backend.bat >nul 2>&1
if exist start_frontend.bat del start_frontend.bat >nul 2>&1

REM Remove virtual environment and node_modules
if exist backend\venv (
    echo Removing Python virtual environment...
    rmdir /s /q backend\venv >nul 2>&1
)

if exist frontend\node_modules (
    echo Removing Node.js dependencies...
    rmdir /s /q frontend\node_modules >nul 2>&1
)

REM Remove database and environment files
if exist backend\srms.db del backend\srms.db >nul 2>&1
if exist backend\.env del backend\.env >nul 2>&1
if exist frontend\.env.local del frontend\.env.local >nul 2>&1

echo [STEP 4/4] Cleanup complete.

echo.
echo ================================================================
echo                 UNINSTALLATION COMPLETE!
echo ================================================================
echo.
echo SRMS has been successfully removed from your system.
echo.
echo NOTE: The source code files remain for potential reinstallation.
echo To completely remove everything, delete this entire folder.
echo.
echo Thank you for using the Student Result Management System!
echo.
pause