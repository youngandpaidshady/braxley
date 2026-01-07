# Push to GitHub Script
# Run this after creating your GitHub repository

$env:Path += ";C:\Program Files\Git\bin"

Write-Host "🚀 Push to GitHub" -ForegroundColor Green
Write-Host "=================`n" -ForegroundColor Green

# Check if remote exists
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote found: $remote" -ForegroundColor Green
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
    } else {
        Write-Host "`n❌ Push failed. You may need to authenticate." -ForegroundColor Red
        Write-Host "`nTry using GitHub Desktop or Personal Access Token:" -ForegroundColor Yellow
        Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ No remote repository configured." -ForegroundColor Red
    Write-Host "`n📝 To connect:" -ForegroundColor Cyan
    Write-Host "1. Create repository at: https://github.com/new" -ForegroundColor White
    Write-Host "2. Then run:" -ForegroundColor White
    Write-Host "   `$env:Path += `";C:\Program Files\Git\bin`"" -ForegroundColor Gray
    Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git" -ForegroundColor Gray
    Write-Host "   git push -u origin main" -ForegroundColor Gray
    Write-Host "`nOr enter your details now:" -ForegroundColor Cyan
    $username = Read-Host "GitHub Username"
    if ($username) {
        $repoName = Read-Host "Repository Name (default: ivan-remodeling)"
        if (-not $repoName) { $repoName = "ivan-remodeling" }
        
        Write-Host "`n🔗 Adding remote..." -ForegroundColor Yellow
        git remote add origin "https://github.com/$username/$repoName.git"
        
        Write-Host "📤 Pushing..." -ForegroundColor Yellow
        git push -u origin main
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Success!" -ForegroundColor Green
        } else {
            Write-Host "`n⚠️  You may need to:" -ForegroundColor Yellow
            Write-Host "1. Create the repository first at https://github.com/new" -ForegroundColor White
            Write-Host "2. Use GitHub Desktop for easier authentication" -ForegroundColor White
        }
    }
}

