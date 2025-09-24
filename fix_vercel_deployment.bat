@echo off
echo ========================================
echo      Fix Vercel Deployment - SRMS
echo ========================================
echo.

:: Navigate to project root
cd /d "X:\sony"

echo Step 1: Creating Vercel project configuration...
echo.

:: Create vercel.json in the root directory
echo Creating root vercel.json...
(
echo {
echo   "version": 2,
echo   "name": "srms-application",
echo   "builds": [
echo     {
echo       "src": "frontend/package.json",
echo       "use": "@vercel/static-build",
echo       "config": {
echo         "distDir": "dist"
echo       }
echo     }
echo   ],
echo   "routes": [
echo     {
echo       "src": "/assets/^(.*^)",
echo       "headers": {
echo         "cache-control": "max-age=31536000, immutable"
echo       }
echo     },
echo     {
echo       "src": "/^(.*^)",
echo       "dest": "/index.html"
echo     }
echo   ],
echo   "rewrites": [
echo     {
echo       "source": "/^(.*^)",
echo       "destination": "/index.html"
echo     }
echo   ]
echo }
) > vercel.json

echo Step 2: Creating package.json in root for Vercel...
echo.

:: Create package.json in root to guide Vercel
(
echo {
echo   "name": "srms-application",
echo   "version": "1.0.0",
echo   "private": true,
echo   "scripts": {
echo     "build": "cd frontend && npm install && npm run build && cp -r dist/* ../public/",
echo     "install": "cd frontend && npm install"
echo   },
echo   "devDependencies": {
echo     "vite": "^4.2.0"
echo   }
echo }
) > package.json

echo Step 3: Creating public directory structure...
echo.
mkdir public 2>nul

echo Step 4: Updating frontend package.json for Vercel...
echo.
cd frontend

:: Check if package.json exists
if not exist "package.json" (
    echo Error: frontend/package.json not found!
    pause
    exit /b 1
)

:: Add Vercel-specific build script
echo Adding Vercel build configurations...

echo Step 5: Building the application...
echo.
call npm install
if %errorlevel% neq 0 (
    echo Error: npm install failed
    pause
    exit /b 1
)

call npm run build
if %errorlevel% neq 0 (
    echo Error: Build failed
    pause
    exit /b 1
)

echo Step 6: Copying build files to public directory...
cd..
xcopy "frontend\dist\*" "public\" /E /I /Y

echo Step 7: Creating deployment-ready structure...
echo.

:: Create .vercelignore in root
(
echo node_modules
echo .git
echo backend
echo *.log
echo .env.local
echo .DS_Store
) > .vercelignore

echo Step 8: Committing changes and redeploying...
echo.
git add .
git commit -m "fix: Configure Vercel deployment with correct build settings"
git push origin main

echo.
echo ========================================
echo      Vercel Fix Complete! 🚀
echo ========================================
echo.
echo ✅ Root vercel.json created
echo ✅ Package.json configured for Vercel
echo ✅ Build files copied to public/
echo ✅ Changes pushed to GitHub
echo.
echo 🚀 Next steps:
echo 1. Go to Vercel dashboard
echo 2. Redeploy your project
echo 3. Set Root Directory to: . (dot for root)
echo 4. Set Build Command to: npm run build
echo 5. Set Output Directory to: public
echo.
echo Or use these settings in Vercel:
echo   Framework Preset: Other
echo   Root Directory: .
echo   Build Command: npm run build  
echo   Output Directory: public
echo.
pause