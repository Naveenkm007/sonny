@echo off
echo ========================================
echo      SRMS Vercel Deployment Script
echo ========================================
echo.

:: Check if in frontend directory
if not exist "package.json" (
    echo Error: Not in frontend directory!
    echo Please run this script from the frontend folder.
    pause
    exit /b 1
)

:: Check if vercel is installed
vercel --version >nul 2>&1
if errorlevel 1 (
    echo Installing Vercel CLI...
    npm install -g vercel
    if errorlevel 1 (
        echo Error: Failed to install Vercel CLI
        echo Please install manually: npm i -g vercel
        pause
        exit /b 1
    )
)

echo Step 1: Installing dependencies...
call npm install
if errorlevel 1 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Step 2: Building the application...
call npm run build
if errorlevel 1 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo.
echo Step 3: Deploying to Vercel...
echo.
echo Choose deployment type:
echo 1. Production deployment
echo 2. Preview deployment
echo.
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="1" (
    echo Deploying to production...
    call vercel --prod
) else if "%choice%"=="2" (
    echo Creating preview deployment...
    call vercel
) else (
    echo Invalid choice. Deploying to production by default...
    call vercel --prod
)

if errorlevel 1 (
    echo.
    echo Deployment failed. Please check the errors above.
    echo.
    echo Common solutions:
    echo - Run: vercel login
    echo - Check internet connection
    echo - Verify project settings
) else (
    echo.
    echo ========================================
    echo     Deployment Successful! 🎉
    echo ========================================
    echo.
    echo Your SRMS application is now live!
    echo Check the URLs provided above.
    echo.
)

echo.
pause