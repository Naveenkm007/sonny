# PowerShell Git Push Script for SRMS
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "      SRMS Git Push to GitHub" -ForegroundColor Cyan  
Write-Host "========================================" -ForegroundColor Cyan
Write-Host

# Navigate to project root
Set-Location "X:\sony"
Write-Host "Current directory: $(Get-Location)" -ForegroundColor Green

# Step 1: Add all files
Write-Host "`nStep 1: Adding all files..." -ForegroundColor Yellow
try {
    git add .
    Write-Host "✅ Files added successfully" -ForegroundColor Green
} catch {
    Write-Host "❌ Error adding files: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Commit changes
Write-Host "`nStep 2: Committing changes..." -ForegroundColor Yellow
try {
    git commit -m "feat: Complete SRMS application with modern UI/UX and Vercel deployment"
    Write-Host "✅ Changes committed successfully" -ForegroundColor Green
} catch {
    Write-Host "⚠️ No changes to commit or commit failed" -ForegroundColor Yellow
}

# Step 3: Check and switch branch
Write-Host "`nStep 3: Checking current branch..." -ForegroundColor Yellow
try {
    $currentBranch = git branch --show-current 2>$null
    if ($currentBranch -eq "master" -or $currentBranch -eq $null) {
        Write-Host "Switching to main branch..." -ForegroundColor Yellow
        git checkout -b main 2>$null
        git branch -D master 2>$null
        $currentBranch = "main"
    }
    Write-Host "Current branch: $currentBranch" -ForegroundColor Green
} catch {
    Write-Host "Using default branch" -ForegroundColor Yellow
    $currentBranch = "main"
}

# Step 4: Setup remote
Write-Host "`nStep 4: Setting up remote origin..." -ForegroundColor Yellow
try {
    git remote remove origin 2>$null
    git remote add origin https://github.com/Naveenkm007/sonny.git
    Write-Host "✅ Remote origin configured" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Remote setup warning (continuing)" -ForegroundColor Yellow
}

# Step 5: Push to GitHub
Write-Host "`nStep 5: Pushing to GitHub..." -ForegroundColor Yellow
try {
    git push -u origin $currentBranch
    Write-Host "`n========================================" -ForegroundColor Green
    Write-Host "        SUCCESS! 🎉" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "`n✅ SRMS application pushed to GitHub!" -ForegroundColor Green
    Write-Host "✅ Repository: https://github.com/Naveenkm007/sonny" -ForegroundColor Green
    Write-Host "`n🚀 Ready for Vercel deployment!" -ForegroundColor Cyan
} catch {
    Write-Host "`n❌ Push failed. Trying force push..." -ForegroundColor Red
    $response = Read-Host "Do you want to force push? This will overwrite remote repository (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        try {
            git push -u origin $currentBranch --force
            Write-Host "✅ Force push successful!" -ForegroundColor Green
        } catch {
            Write-Host "❌ Force push also failed. Check:" -ForegroundColor Red
            Write-Host "1. GitHub authentication" -ForegroundColor Yellow
            Write-Host "2. Repository exists: https://github.com/Naveenkm007/sonny" -ForegroundColor Yellow
            Write-Host "3. Internet connection" -ForegroundColor Yellow
        }
    } else {
        Write-Host "Push cancelled by user" -ForegroundColor Yellow
    }
}

Write-Host "`nPress any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")