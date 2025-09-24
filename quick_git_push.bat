@echo off
echo ========================================
echo      Quick Git Push to GitHub
echo ========================================
echo.

:: Navigate to project root (not frontend)
cd /d "X:\sony"
echo Current directory: %cd%

echo.
echo Step 1: Adding all files...
git add .

echo.
echo Step 2: Committing changes...
git commit -m "feat: Complete SRMS application with modern UI/UX and Vercel deployment"

echo.
echo Step 3: Checking current branch...
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set current_branch=%%i
if "%current_branch%"=="" set current_branch=master
echo Current branch: %current_branch%

echo.
echo Step 4: Switching to main branch if needed...
if "%current_branch%"=="master" (
    echo Creating and switching to main branch...
    git checkout -b main
    if %errorlevel% neq 0 (
        echo Warning: Could not create main branch, continuing with current branch
    )
)

echo.
echo Step 5: Updating remote origin...
git remote remove origin 2>nul
git remote add origin https://github.com/Naveenkm007/sonny.git
echo Remote origin set to: https://github.com/Naveenkm007/sonny.git

echo.
echo Step 6: Pushing to GitHub...
git push -u origin main
if %errorlevel% neq 0 (
    echo.
    echo Push failed, trying with current branch...
    for /f "tokens=*" %%i in ('git branch --show-current') do set push_branch=%%i
    git push -u origin %push_branch%
    if %errorlevel% neq 0 (
        echo.
        echo Still failed. Trying force push...
        echo WARNING: This will overwrite the remote repository!
        choice /c YN /m "Do you want to force push"
        if errorlevel 2 goto :end
        git push -u origin %push_branch% --force
    )
)

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo        SUCCESS! 🎉
    echo ========================================
    echo.
    echo ✅ SRMS application pushed to GitHub!
    echo ✅ Repository: https://github.com/Naveenkm007/sonny
    echo.
    echo 🚀 Ready for Vercel deployment!
    echo.
) else (
    echo.
    echo ❌ Push failed. Common solutions:
    echo 1. Check if you're logged into GitHub
    echo 2. Verify repository exists: https://github.com/Naveenkm007/sonny
    echo 3. Check internet connection
    echo 4. Run: git config --global user.name "Your Name"
    echo 5. Run: git config --global user.email "your@email.com"
)

:end
echo.
pause