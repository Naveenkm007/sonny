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
    set deploy_exit_code=%errorlevel%
) else if "%choice%"=="2" (
    echo Creating preview deployment...
    call vercel
    set deploy_exit_code=%errorlevel%
) else (
    echo Invalid choice. Deploying to production by default...
    call vercel --prod
    set deploy_exit_code=%errorlevel%
)

if %deploy_exit_code% neq 0 (
    echo.
    echo ❌ Deployment failed with exit code: %deploy_exit_code%
    echo.
    echo 🔧 Common troubleshooting steps:
    echo 1. Check internet connection
    echo 2. Verify Vercel login: vercel login
    echo 3. Check build logs for errors
    echo 4. Ensure all files are committed to Git
    echo 5. Try: vercel --debug --prod for detailed logs
    echo.
    echo 📚 For specific error codes, check:
    echo https://vercel.com/docs/errors
    echo.
    echo 🆘 If deployment keeps failing:
    echo - Clear cache: vercel --force
    echo - Check project settings in Vercel dashboard
    echo - Verify environment variables
) else (
    echo.
    echo ========================================
    echo     Deployment Successful! 🎉
    echo ========================================
    echo.
    echo Your SRMS application is now live!
    echo.
    echo ✅ Features available:
    echo - Modern UI with gradient themes
    echo - Student management system
    echo - Subject management
    echo - Results management with grade calculation
    echo - Dark/Light mode toggle
    echo - Mobile responsive design
    echo - CSV export functionality
    echo.
    echo 🔗 Next steps:
    echo 1. Test all features on the live URL
    echo 2. Set up custom domain (optional)
    echo 3. Enable Vercel Analytics
    echo 4. Monitor performance
    echo.
)

echo.
pause