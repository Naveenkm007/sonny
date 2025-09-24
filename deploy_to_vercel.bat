@echo off
echo ====================================
echo   VERCEL DEPLOYMENT AUTOMATION
echo ====================================
echo.

echo [1/5] Checking project structure...
if not exist "frontend\package.json" (
    echo ERROR: frontend/package.json not found!
    echo Please run this script from the project root directory.
    pause
    exit /b 1
)

echo [2/5] Cleaning build environment...
cd frontend
if exist "node_modules" (
    echo Removing old node_modules...
    rmdir /s /q node_modules 2>nul
    timeout /t 2 >nul
)

if exist "dist" (
    echo Removing old dist folder...
    rmdir /s /q dist 2>nul
)

echo [3/5] Installing dependencies...
npm cache clean --force
npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    echo Try running as Administrator or check antivirus settings.
    pause
    exit /b 1
)

echo [4/5] Building project...
npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    echo Check the error messages above.
    pause
    exit /b 1
)

echo [5/5] Deploying to Vercel...
cd ..
npx vercel --prod
if %errorlevel% neq 0 (
    echo ERROR: Vercel deployment failed!
    echo.
    echo ALTERNATIVE: Use GitHub integration:
    echo 1. Go to vercel.com
    echo 2. Click "New Project"
    echo 3. Import from GitHub: Naveenkm007/sonny
    echo 4. Use these settings:
    echo    - Framework: Vite
    echo    - Build Command: cd frontend ^&^& npm ci ^&^& npm run build
    echo    - Output Directory: frontend/dist
    pause
    exit /b 1
)

echo.
echo ====================================
echo   DEPLOYMENT SUCCESSFUL! 🎉
echo ====================================
echo.
echo Your SRMS application is now live!
echo.
echo Features deployed:
echo ✅ Modern UI with glassmorphism effects
echo ✅ Fully functional dark mode
echo ✅ Student management system
echo ✅ Professional gradient design
echo ✅ Responsive layout
echo.
pause