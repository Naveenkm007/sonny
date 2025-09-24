@echo off
echo ========================================
echo      SRMS Git Push Fix Script
echo ========================================
echo.

:: Navigate to project root
cd /d "X:\sony"

echo Step 1: Checking current repository status...
git status

echo.
echo Step 2: Adding all files (including new deployment files)...
git add .

echo.
echo Step 3: Checking if there are changes to commit...
git diff --cached --quiet
if %errorlevel% neq 0 (
    echo Found changes to commit...
    git commit -m "feat: Complete SRMS application with modern UI/UX and Vercel deployment setup"
    if %errorlevel% neq 0 (
        echo Error during commit
        pause
        exit /b 1
    )
) else (
    echo No new changes to commit, proceeding with push...
)

echo.
echo Step 4: Checking current branch...
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
echo Current branch: %current_branch%

:: If on master, create and switch to main
if "%current_branch%"=="master" (
    echo Switching from master to main branch...
    git checkout -b main
    git branch -D master
    set current_branch=main
)

echo.
echo Step 5: Checking remote origin...
git remote -v
if %errorlevel% neq 0 (
    echo Adding remote origin...
    git remote add origin https://github.com/Naveenkm007/sonny.git
) else (
    echo Remote origin already exists, updating URL...
    git remote set-url origin https://github.com/Naveenkm007/sonny.git
)

echo.
echo Step 6: Pushing to GitHub...
git push -u origin %current_branch%
if %errorlevel% neq 0 (
    echo Push failed, trying to force push (this will overwrite remote)...
    echo.
    set /p confirm="Do you want to force push? This will overwrite remote repository (y/n): "
    if /i "%confirm%"=="y" (
        git push -u origin %current_branch% --force
        if %errorlevel% neq 0 (
            echo Force push failed. Possible issues:
            echo 1. Authentication problems
            echo 2. Repository doesn't exist
            echo 3. No push permissions
            echo.
            echo Manual steps to try:
            echo 1. git remote -v   (verify remote URL)
            echo 2. git config --global user.name "Your Name"
            echo 3. git config --global user.email "your.email@example.com"
            echo 4. git push -v      (verbose push for debugging)
            pause
            exit /b 1
        )
    ) else (
        echo Push cancelled by user
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo     Successfully Pushed to GitHub! 🎉
echo ========================================
echo.
echo Repository URL: https://github.com/Naveenkm007/sonny.git
echo Branch: %current_branch%
echo.
echo ✅ Your SRMS application is now on GitHub!
echo ✅ Ready for Vercel deployment
echo.
echo Next steps:
echo 1. Visit: https://github.com/Naveenkm007/sonny
echo 2. Deploy to Vercel using the repository
echo 3. Enable automatic deployments
echo.
pause