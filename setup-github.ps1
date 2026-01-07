# GitHub Setup Helper Script
# This script helps you connect to GitHub

Write-Host "🔗 GitHub Setup Helper" -ForegroundColor Cyan
Write-Host "======================`n" -ForegroundColor Cyan

# Check if Git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install from:" -ForegroundColor Red
    Write-Host "   https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "`nAfter installing, restart this script." -ForegroundColor Yellow
    exit 1
}

# Check if repository is initialized
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✅ Repository initialized" -ForegroundColor Green
}

# Check if remote exists
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Remote already configured: $remote" -ForegroundColor Green
    Write-Host "`nYou can now run: .\auto-commit.ps1" -ForegroundColor Cyan
} else {
    Write-Host "`n📝 No remote repository configured." -ForegroundColor Yellow
    Write-Host "`nFollow these steps:" -ForegroundColor Cyan
    Write-Host "`n1. Open Chrome and go to: https://github.com/new" -ForegroundColor White
    Write-Host "2. Create a new repository (name it 'ivan-remodeling' or your choice)" -ForegroundColor White
    Write-Host "3. DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "4. Copy the repository URL (e.g., https://github.com/YOUR_USERNAME/ivan-remodeling.git)" -ForegroundColor White
    Write-Host "`n5. Then run this command (replace YOUR_USERNAME and REPO_NAME):" -ForegroundColor Cyan
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Gray
    Write-Host "   git branch -M main" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    
    Write-Host "`nOr, if you want to do it interactively, enter your GitHub username:" -ForegroundColor Cyan
    $username = Read-Host "GitHub Username"
    if ($username) {
        $repoName = Read-Host "Repository Name (default: ivan-remodeling)"
        if (-not $repoName) { $repoName = "ivan-remodeling" }
        
        Write-Host "`n🔗 Adding remote..." -ForegroundColor Yellow
        git remote add origin "https://github.com/$username/$repoName.git"
        git branch -M main
        
        Write-Host "✅ Remote added!" -ForegroundColor Green
        Write-Host "`nNow you can:" -ForegroundColor Cyan
        Write-Host "1. Create the repository at: https://github.com/new" -ForegroundColor White
        Write-Host "2. Run: .\auto-commit.ps1" -ForegroundColor White
    }
}

