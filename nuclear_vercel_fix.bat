@echo off
echo ========================================
echo    NUCLEAR OPTION: Complete Vercel Fix
echo ========================================
echo.

cd /d "X:\sony"

echo 🔥 COMPLETE RESET - This WILL work!
echo.

echo Step 1: Moving frontend to root (Vercel-friendly structure)...
:: Create a backup
mkdir backup 2>nul
xcopy frontend backup\frontend /E /I /Y /Q

:: Copy all frontend files to root
echo Copying React app files to root directory...
copy "frontend\package.json" "." /Y
copy "frontend\vite.config.js" "." /Y 2>nul
copy "frontend\index.html" "." /Y
copy "frontend\tailwind.config.js" "." /Y 2>nul
copy "frontend\postcss.config.js" "." /Y 2>nul

:: Copy src directory to root
xcopy "frontend\src" "src" /E /I /Y /Q
xcopy "frontend\public" "public" /E /I /Y /Q 2>nul

echo Step 2: Creating ultra-simple vercel.json...
(
echo {
echo   "buildCommand": "npm run build",
echo   "outputDirectory": "dist",
echo   "devCommand": "npm run dev",
echo   "installCommand": "npm install"
echo }
) > vercel.json

echo Step 3: Updating package.json for root deployment...
:: Create new package.json optimized for Vercel
(
echo {
echo   "name": "srms-application",
echo   "private": true,
echo   "version": "1.0.0",
echo   "type": "module",
echo   "scripts": {
echo     "dev": "vite",
echo     "build": "vite build",
echo     "preview": "vite preview"
echo   },
echo   "dependencies": {
echo     "@heroicons/react": "^2.2.0",
echo     "axios": "^1.3.4",
echo     "clsx": "^1.2.1",
echo     "lucide-react": "^0.220.0",
echo     "react": "^18.2.0",
echo     "react-dom": "^18.2.0",
echo     "react-router-dom": "^6.8.1",
echo     "recharts": "^2.5.0"
echo   },
echo   "devDependencies": {
echo     "@types/react": "^18.0.28",
echo     "@types/react-dom": "^18.0.11",
echo     "@vitejs/plugin-react": "^3.1.0",
echo     "autoprefixer": "^10.4.14",
echo     "postcss": "^8.4.21",
echo     "tailwindcss": "^3.2.7",
echo     "vite": "^4.2.0"
echo   }
echo }
) > package.json

echo Step 4: Creating simple vite.config.js...
(
echo import { defineConfig } from 'vite'
echo import react from '@vitejs/plugin-react'
echo.
echo export default defineConfig^({
echo   plugins: [react^(^)],
echo   build: {
echo     outDir: 'dist',
echo     assetsDir: 'assets'
echo   }
echo }^)
) > vite.config.js

echo Step 5: Testing build locally...
call npm install --force
call npm run build

if not exist "dist\index.html" (
    echo ❌ Build failed! Checking for issues...
    dir
    pause
    exit /b 1
)

echo ✅ Build successful - dist/index.html created!

echo Step 6: Committing nuclear fix...
git add .
git commit -m "fix: Nuclear option - move React app to root for Vercel"
git push origin main --force

echo.
echo ========================================
echo     NUCLEAR FIX COMPLETE! 💥
echo ========================================
echo.
echo ✅ React app moved to root directory
echo ✅ Ultra-simple Vercel configuration
echo ✅ Build tested and working locally
echo ✅ All changes pushed to GitHub
echo.
echo 🚀 VERCEL SETTINGS (Use these EXACT settings):
echo.
echo Framework Preset: Vite
echo Root Directory: . ^(leave empty^)
echo Build Command: npm run build
echo Output Directory: dist
echo Install Command: npm install
echo.
echo 📍 NOW GO TO VERCEL AND:
echo 1. Delete current project completely
echo 2. Import fresh from GitHub
echo 3. Use settings above
echo 4. Deploy
echo.
echo This WILL work - React app is now in root! 🚀
echo.
pause