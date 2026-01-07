# Quick Push to GitHub
$env:Path += ";C:\Program Files\Git\bin"

Write-Host "Quick Push to GitHub" -ForegroundColor Green
Write-Host "===================" -ForegroundColor Green

# Check remote
$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Remote: $remote" -ForegroundColor Cyan
    Write-Host "Pushing..." -ForegroundColor Yellow
    git push -u origin main
} else {
    Write-Host "No remote. Create repo at https://github.com/new" -ForegroundColor Yellow
    Write-Host "Then run: git remote add origin https://github.com/USERNAME/REPO.git" -ForegroundColor Gray
}

