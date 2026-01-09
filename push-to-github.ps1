# Push to GitHub Script
# This script helps you push your code to GitHub

Write-Host "🚀 Push to GitHub" -ForegroundColor Cyan
Write-Host "==================`n" -ForegroundColor Cyan

# Add Git to PATH
$env:Path += ";C:\Program Files\Git\bin"

# Check if Git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed. Please install from:" -ForegroundColor Red
    Write-Host "   https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# Check if remote exists
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Remote repository found: $remote" -ForegroundColor Green
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    
    # Push to GitHub
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "`n🌐 Your code is now on GitHub at: $remote" -ForegroundColor Cyan
    } else {
        Write-Host "`n❌ Push failed. Please check:" -ForegroundColor Red
        Write-Host "   - Your GitHub credentials are configured" -ForegroundColor Yellow
        Write-Host "   - The repository exists on GitHub" -ForegroundColor Yellow
        Write-Host "   - You have push permissions" -ForegroundColor Yellow
    }
} else {
    Write-Host "`n📝 No remote repository configured." -ForegroundColor Yellow
    Write-Host "`nFollow these steps:" -ForegroundColor Cyan
    
    Write-Host "`n1. Create a GitHub repository:" -ForegroundColor White
    Write-Host "   - Go to: https://github.com/new" -ForegroundColor Gray
    Write-Host "   - Repository name: ivan-remodeling (or your choice)" -ForegroundColor Gray
    Write-Host "   - DO NOT initialize with README, .gitignore, or license" -ForegroundColor Yellow
    Write-Host "   - Click 'Create repository'" -ForegroundColor Gray
    
    Write-Host "`n2. Enter your GitHub details:" -ForegroundColor White
    $username = Read-Host "   GitHub Username"
    $repoName = Read-Host "   Repository Name (default: ivan-remodeling)"
    
    if (-not $repoName) { $repoName = "ivan-remodeling" }
    
    if ($username) {
        $repoUrl = "https://github.com/$username/$repoName.git"
        
        Write-Host "`n🔗 Adding remote repository..." -ForegroundColor Yellow
        git remote add origin $repoUrl
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Remote added!" -ForegroundColor Green
            
            Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
            git push -u origin main
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
                Write-Host "`n🌐 Your code is now on GitHub at: $repoUrl" -ForegroundColor Cyan
            } else {
                Write-Host "`n❌ Push failed. You may need to:" -ForegroundColor Red
                Write-Host "   - Create the repository on GitHub first" -ForegroundColor Yellow
                Write-Host "   - Configure Git credentials" -ForegroundColor Yellow
                Write-Host "   - Use GitHub Desktop or Personal Access Token" -ForegroundColor Yellow
            }
        } else {
            Write-Host "❌ Failed to add remote. Check your repository URL." -ForegroundColor Red
        }
    } else {
        Write-Host "`n⚠️  No username provided. Exiting." -ForegroundColor Yellow
        Write-Host "`nYou can manually add the remote with:" -ForegroundColor Cyan
        Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Gray
        Write-Host "   git push -u origin main" -ForegroundColor Gray
    }
}

Write-Host "`n" -ForegroundColor White
