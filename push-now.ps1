$env:Path += ";C:\Program Files\Git\bin"
cd C:\Users\HP\Desktop\novak
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push -u origin main
