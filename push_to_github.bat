@echo off
echo ========================================
echo      SRMS GitHub Push Script
echo ========================================
echo.

:: Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo Error: Git is not installed or not in PATH
    echo Please install Git from https://git-scm.com/
    pause
    exit /b 1
)

:: Check if we're in a git repository
if not exist ".git" (
    echo Initializing Git repository...
    git init
    if errorlevel 1 (
        echo Error: Failed to initialize Git repository
        pause
        exit /b 1
    )
)

echo Step 1: Adding all files to Git...
git add .
if errorlevel 1 (
    echo Error: Failed to add files to Git
    pause
    exit /b 1
)

echo.
echo Step 2: Committing changes...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" (
    set commit_message=feat: Complete SRMS application with modern UI/UX and Vercel deployment setup
)

git commit -m "%commit_message%"
if errorlevel 1 (
    echo Warning: No changes to commit or commit failed
    echo This might be normal if no files have changed
)

echo.
echo Step 3: Checking for existing remote...
git remote -v >nul 2>&1
if errorlevel 1 (
    echo No remote repository found.
    echo.
    echo Please create a repository on GitHub first, then enter the details:
    echo Example: https://github.com/username/srms-application.git
    echo.
    set /p repo_url="Enter your GitHub repository URL: "
    
    if "!repo_url!"=="" (
        echo Error: Repository URL cannot be empty
        pause
        exit /b 1
    )
    
    echo Adding remote origin...
    git remote add origin !repo_url!
    if errorlevel 1 (
        echo Error: Failed to add remote origin
        pause
        exit /b 1
    )
) else (
    echo Remote repository found.
)

echo.
echo Step 4: Checking current branch...
for /f "tokens=*" %%i in ('git branch --show-current') do set current_branch=%%i
if "%current_branch%"=="" (
    echo Setting default branch to main...
    git branch -M main
    set current_branch=main
)

echo Current branch: %current_branch%

echo.
echo Step 5: Pushing to GitHub...
git push -u origin %current_branch%
if errorlevel 1 (
    echo.
    echo Push failed. This might be due to:
    echo 1. Authentication issues - ensure you're logged in to Git
    echo 2. Repository doesn't exist on GitHub
    echo 3. Network connectivity issues
    echo.
    echo Trying to set upstream and push again...
    git push --set-upstream origin %current_branch%
    if errorlevel 1 (
        echo.
        echo Still failed. Please check:
        echo - GitHub repository exists and is accessible
        echo - You have push permissions
        echo - Git credentials are configured
        echo.
        echo Manual steps:
        echo 1. git remote -v  (check remote URL)
        echo 2. git status      (check repository status)
        echo 3. git push -v     (verbose push for debugging)
        pause
        exit /b 1
    )
)

echo.
echo ========================================
echo     Successfully Pushed to GitHub! 🎉
echo ========================================
echo.
echo Your SRMS application is now on GitHub!
echo.
echo Next Steps:
echo 1. Go to your GitHub repository
echo 2. Enable GitHub Pages (if needed)
echo 3. Connect to Vercel for auto-deployment
echo.
echo Repository URL: 
git remote get-url origin
echo.
echo Branch: %current_branch%
echo.
pause