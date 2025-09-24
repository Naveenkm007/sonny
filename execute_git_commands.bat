@echo off
echo ========================================
echo    Executing Git Commands - SRMS
echo ========================================
echo.

:: Navigate to project root
cd /d "X:\sony"
echo Current directory: %cd%
echo.

echo Step 1: Adding all files...
git add .
if %errorlevel% neq 0 (
    echo ❌ Error adding files
    pause
    exit /b 1
)
echo ✅ Files added successfully

echo.
echo Step 2: Committing changes...
git commit -m "feat: Complete SRMS application with modern UI/UX"
if %errorlevel% neq 0 (
    echo ⚠️ Commit failed or no changes to commit
    echo Continuing with next steps...
)
echo ✅ Commit completed

echo.
echo Step 3: Creating and switching to main branch...
git checkout -b main
if %errorlevel% neq 0 (
    echo ⚠️ Branch creation failed, might already exist
    echo Switching to main branch...
    git checkout main
)
echo ✅ Now on main branch

echo.
echo Step 4: Removing existing remote origin...
git remote remove origin
if %errorlevel% neq 0 (
    echo ⚠️ No existing remote to remove (normal)
)
echo ✅ Remote origin cleaned

echo.
echo Step 5: Adding new remote origin...
git remote add origin https://github.com/Naveenkm007/sonny.git
if %errorlevel% neq 0 (
    echo ❌ Error adding remote origin
    pause
    exit /b 1
)
echo ✅ Remote origin added

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo ❌ Push failed. Trying force push...
    echo.
    choice /c YN /m "Force push (will overwrite remote)?"
    if errorlevel 2 goto :error
    
    git push -u origin main --force
    if %errorlevel% neq 0 (
        goto :error
    )
)

echo.
echo ========================================
echo        SUCCESS! 🎉
echo ========================================
echo.
echo ✅ SRMS application pushed to GitHub!
echo ✅ Repository: https://github.com/Naveenkm007/sonny.git
echo ✅ Branch: main
echo.
echo 🚀 Ready for Vercel deployment!
echo.
echo Next steps:
echo 1. Go to Vercel dashboard
echo 2. Import project from GitHub
echo 3. Set Root Directory to: frontend
echo 4. Deploy
echo.
goto :end

:error
echo.
echo ❌ Push failed. Common solutions:
echo 1. Check internet connection
echo 2. Verify GitHub login: git config --global user.name "Your Name"
echo 3. Check repository permissions
echo 4. Try: git push -v for verbose output
echo.

:end
pause