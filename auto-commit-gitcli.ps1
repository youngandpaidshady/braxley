# Auto Commit & Push using Git CLI
# This script automates the entire Git workflow

$env:Path += ";C:\Program Files\Git\bin"

Write-Host "🚀 Auto Commit & Push Script" -ForegroundColor Green
Write-Host "============================`n" -ForegroundColor Green

# Check Git
try {
    $gitVersion = git --version
    Write-Host "✅ Git: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git not found!" -ForegroundColor Red
    exit 1
}

# Check if repository is initialized
if (-not (Test-Path .git)) {
    Write-Host "📦 Initializing repository..." -ForegroundColor Yellow
    git init
    git branch -M main
}

# Configure Git if needed
$currentName = git config user.name 2>&1
if (-not $currentName -or $currentName -match "error") {
    Write-Host "⚙️  Configuring Git identity..." -ForegroundColor Yellow
    git config user.name "Ivan Remodeling"
    git config user.email "ivan@ivanremodeling.com"
}

# Stage all changes
Write-Host "`n➕ Staging all changes..." -ForegroundColor Yellow
git add .

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    
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
        git log --oneline -1
    } else {
        Write-Host "❌ Commit failed" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "ℹ️  No changes to commit" -ForegroundColor Cyan
}

# Check for remote
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n🌐 Remote found: $remote" -ForegroundColor Green
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    
    git push -u origin main 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`n⚠️  Push failed. Possible reasons:" -ForegroundColor Yellow
        Write-Host "   - Repository doesn't exist on GitHub" -ForegroundColor White
        Write-Host "   - Authentication required" -ForegroundColor White
        Write-Host "`n💡 Solutions:" -ForegroundColor Cyan
        Write-Host "   1. Create repo at: https://github.com/new" -ForegroundColor White
        Write-Host "   2. Use GitHub Desktop for easy auth" -ForegroundColor White
        Write-Host "   3. Or run: gh auth login (if GitHub CLI installed)" -ForegroundColor White
    }
} else {
    Write-Host "`n⚠️  No remote configured" -ForegroundColor Yellow
    Write-Host "`n📝 To connect to GitHub:" -ForegroundColor Cyan
    Write-Host "   1. Create repository: https://github.com/new" -ForegroundColor White
    Write-Host "   2. Run: git remote add origin https://github.com/YOUR_USERNAME/REPO.git" -ForegroundColor Gray
    Write-Host "   3. Run: git push -u origin main" -ForegroundColor Gray
    
    # Try GitHub CLI if available
    $ghAvailable = Get-Command gh -ErrorAction SilentlyContinue
    if ($ghAvailable) {
        Write-Host "`n🔐 GitHub CLI detected. Attempting to create repo..." -ForegroundColor Cyan
        $repoName = "ivan-remodeling"
        Write-Host "Creating repository: $repoName" -ForegroundColor Yellow
        
        gh repo create $repoName --public --source=. --remote=origin --push 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Repository created and pushed!" -ForegroundColor Green
        } else {
            Write-Host "`n⚠️  GitHub CLI failed. Please create repo manually." -ForegroundColor Yellow
        }
    }
}

Write-Host "`n✨ Done!" -ForegroundColor Green

