# Quick Git Push Commands
# Run these commands in PowerShell from X:\sony directory

# Navigate to project root
cd X:\sony

# Add all files
git add .

# Commit changes (if any)
git commit -m "feat: Complete SRMS application with modern UI/UX and Vercel deployment setup"

# Switch to main branch (from master)
git checkout -b main
git branch -D master

# Update remote URL (in case it changed)
git remote set-url origin https://github.com/Naveenkm007/sonny.git

# Push to main branch
git push -u origin main

# If push fails due to conflicts, force push (overwrites remote)
# git push -u origin main --force