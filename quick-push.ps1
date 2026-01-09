$env:Path += ";C:\Program Files\Git\bin"
cd C:\Users\HP\Desktop\novak

$remote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "Pushing to: $remote" -ForegroundColor Green
    git push -u origin main
} else {
    Write-Host "No remote configured. Enter repository URL:" -ForegroundColor Yellow
    Write-Host "Example: https://github.com/username/repo-name.git" -ForegroundColor Gray
    $repoUrl = Read-Host "Repository URL"
    if ($repoUrl) {
        git remote add origin $repoUrl
        git push -u origin main
    }
}
