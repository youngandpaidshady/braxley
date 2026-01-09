param(
    [Parameter(Mandatory=$false)]
    [string]$RepoUrl = ""
)

$env:Path += ";C:\Program Files\Git\bin"
cd C:\Users\HP\Desktop\novak

# Check if remote exists
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote found: $remote" -ForegroundColor Green
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
} else {
    if ($RepoUrl) {
        Write-Host "🔗 Adding remote: $RepoUrl" -ForegroundColor Yellow
        git remote add origin $RepoUrl
        Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
        git push -u origin main
    } else {
        Write-Host "❌ No remote configured and no URL provided." -ForegroundColor Red
        Write-Host "`nUsage:" -ForegroundColor Cyan
        Write-Host "  .\push-github.ps1 -RepoUrl 'https://github.com/username/repo-name.git'" -ForegroundColor White
        Write-Host "`nOr create repository first at: https://github.com/new" -ForegroundColor Yellow
    }
}
