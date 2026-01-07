# Auto Commit Script for Ivan Remodeling Project
# Run this script after Git is installed

Write-Host "🚀 Auto-committing changes to Git..." -ForegroundColor Green

# Check if Git is available
try {
    $gitVersion = git --version 2>&1
    Write-Host "✅ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found. Please install Git first:" -ForegroundColor Red
    Write-Host "   https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if repository is initialized
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repository initialized" -ForegroundColor Green
}

# Check current status
Write-Host "`n📊 Checking repository status..." -ForegroundColor Cyan
git status --short

# Add all files
Write-Host "`n➕ Staging all changes..." -ForegroundColor Yellow
git add .

# Create commit
Write-Host "`n💾 Creating commit..." -ForegroundColor Yellow
$commitMessage = @"
Fix hydration errors and finalize site design

- Fixed SectionTracker to use useState/useEffect instead of typeof window check
- Fixed ScrollProgress to always render same DOM structure
- Updated ThemeProvider with proper default props
- Fixed Services Card dark mode visibility (text colors and contrast)
- Updated Blog page with architectural magazine style
- Restyled Contact forms to blueprint/structural design with underline inputs
- All components now render consistently on server and client
- Production-ready build with no linter errors
"@

git commit -m $commitMessage

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Commit successful!" -ForegroundColor Green
    
    # Check if remote exists
    $remote = git remote get-url origin 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n🌐 Remote found: $remote" -ForegroundColor Cyan
        Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
        git push -u origin main 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Push failed. You may need to:" -ForegroundColor Yellow
            Write-Host "   1. Create a repository on GitHub" -ForegroundColor Yellow
            Write-Host "   2. Run: git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Yellow
            Write-Host "   3. Run: git push -u origin main" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n⚠️  No remote repository configured." -ForegroundColor Yellow
        Write-Host "`nTo connect to GitHub:" -ForegroundColor Cyan
        Write-Host "1. Create a repository at https://github.com/new" -ForegroundColor White
        Write-Host "2. Run these commands:" -ForegroundColor White
        Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Gray
        Write-Host "   git branch -M main" -ForegroundColor Gray
        Write-Host "   git push -u origin main" -ForegroundColor Gray
    }
} else {
    Write-Host "❌ Commit failed. Check for errors above." -ForegroundColor Red
}

Write-Host "`n✨ Done!" -ForegroundColor Green

