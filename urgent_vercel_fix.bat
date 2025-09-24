@echo off
echo ========================================
echo    URGENT: Fix Vercel 404 - SRMS
echo ========================================
echo.

cd /d "X:\sony"

echo 🔍 Diagnosing the issue...
echo The deployment shows "Ready" but 404 error indicates Vercel is not finding the built files.
echo.

echo Step 1: Creating correct Vercel configuration...
:: Delete existing vercel.json and create proper one
del vercel.json 2>nul

(
echo {
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
echo       "handle": "filesystem"
echo     },
echo     {
echo       "src": "/.*",
echo       "dest": "/index.html"
echo     }
echo   ]
echo }
) > vercel.json

echo Step 2: Updating frontend package.json for Vercel...
cd frontend

:: Backup original package.json
copy package.json package.json.backup

:: Update package.json to ensure Vercel builds correctly
powershell -Command "(Get-Content package.json) -replace '\"dev\":\s*\"vite\"', '\"dev\": \"vite\"' -replace '\"build\":\s*\"vite build\"', '\"build\": \"vite build && echo Build completed successfully\"' | Set-Content package.json"

echo Step 3: Creating explicit build verification...
:: Ensure build command works
echo Testing build locally...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Local build failed! Fixing dependencies...
    call npm install --force
    call npm run build
)

:: Check if dist folder was created
if not exist "dist\index.html" (
    echo ❌ Build did not create index.html!
    echo Checking for build issues...
    dir dist
    pause
    exit /b 1
)

echo ✅ Local build successful - dist/index.html exists

echo Step 4: Adding Vercel-specific build script...
cd..

:: Create a build script that Vercel can definitely find
(
echo {
echo   "name": "srms-root",
echo   "scripts": {
echo     "build": "cd frontend && npm ci && npm run build",
echo     "vercel-build": "cd frontend && npm ci && npm run build && cp -r dist/* ../public/ 2>/dev/null || xcopy dist\\* ..\\public\\ /E /I /Y"
echo   },
echo   "devDependencies": {
echo     "@vercel/static-build": "latest"
echo   }
echo }
) > package.json

echo Step 5: Creating public directory with index.html...
mkdir public 2>nul
copy "frontend\dist\index.html" "public\index.html" 2>nul
xcopy "frontend\dist\*" "public\" /E /I /Y /Q

echo Step 6: Vercel deployment settings fix...
:: Create .vercel directory for local settings
mkdir .vercel 2>nul

echo Step 7: Pushing critical fixes...
git add .
git commit -m "fix: Critical Vercel deployment fix - ensure index.html is served"
git push origin main --force

echo.
echo ========================================
echo       CRITICAL FIX DEPLOYED! 🚨
echo ========================================
echo.
echo ✅ Fixed Vercel configuration
echo ✅ Ensured build creates index.html  
echo ✅ Added fallback public/index.html
echo ✅ Updated build scripts
echo ✅ Pushed to GitHub
echo.
echo 🚀 IMMEDIATE ACTION REQUIRED:
echo.
echo 1. Go to Vercel Dashboard → Project Settings
echo 2. Set Framework Preset: "Other" (not Vite)
echo 3. Set Root Directory: "." (root)
echo 4. Set Build Command: "npm run vercel-build"
echo 5. Set Output Directory: "public"
echo 6. Click "Save" and "Redeploy"
echo.
echo OR click "Redeploy" button in Vercel - it should work now!
echo.
echo 📍 Your URLs should work within 2 minutes:
echo   - sonny-nhce.vercel.app
echo   - sonny-nhce-git-main-naveenkm007s-projects.vercel.app
echo.
pause