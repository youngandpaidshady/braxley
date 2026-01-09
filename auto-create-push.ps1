# Auto Create and Push to GitHub
# Usage: .\auto-create-push.ps1 -Username "your-github-username"

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,
    
    [Parameter(Mandatory=$false)]
    [string]$RepoName = "ivan-remodeling"
)

$env:Path += ";C:\Program Files\Git\bin"
cd C:\Users\HP\Desktop\novak

Write-Host "🚀 Auto Push to GitHub" -ForegroundColor Cyan
Write-Host "=====================`n" -ForegroundColor Cyan

# Check if remote exists
$existingRemote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote found: $existingRemote" -ForegroundColor Green
    Write-Host "📤 Pushing..." -ForegroundColor Yellow
    git push -u origin main
    exit $LASTEXITCODE
}

# Add remote
$repoUrl = "https://github.com/$Username/$RepoName.git"
Write-Host "🔗 Adding remote: $repoUrl" -ForegroundColor Yellow
git remote add origin $repoUrl 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote added" -ForegroundColor Green
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed!" -ForegroundColor Green
        Write-Host "🌐 Repository: $repoUrl" -ForegroundColor Cyan
    } else {
        Write-Host "`n⚠️  Push failed. You may need to:" -ForegroundColor Yellow
        Write-Host "   1. Create the repository at: https://github.com/new" -ForegroundColor White
        Write-Host "   2. Authenticate (use GitHub Desktop or Personal Access Token)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Failed to add remote. Repository may not exist yet." -ForegroundColor Red
    Write-Host "   Create it at: https://github.com/new" -ForegroundColor Yellow
    Write-Host "   Name: $RepoName" -ForegroundColor Yellow
}
