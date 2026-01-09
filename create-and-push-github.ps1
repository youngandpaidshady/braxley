# Create GitHub Repository and Push Script
# This script helps you create a GitHub repository and push your code

$env:Path += ";C:\Program Files\Git\bin"
cd C:\Users\HP\Desktop\novak

Write-Host "🚀 Create GitHub Repository & Push" -ForegroundColor Cyan
Write-Host "==================================`n" -ForegroundColor Cyan

# Check if Git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed" -ForegroundColor Red
    exit 1
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Remote already configured: $existingRemote" -ForegroundColor Green
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push -u origin main
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed!" -ForegroundColor Green
    }
    exit 0
}

# Repository name from package.json
$repoName = "ivan-remodeling"

Write-Host "`n📝 Repository Details:" -ForegroundColor Cyan
Write-Host "   Name: $repoName" -ForegroundColor White
Write-Host "   (Based on package.json)" -ForegroundColor Gray

Write-Host "`n🌐 Opening GitHub repository creation page..." -ForegroundColor Yellow
Write-Host "   URL: https://github.com/new" -ForegroundColor Gray

# Open GitHub new repository page
Start-Process "https://github.com/new"

Write-Host "`n📋 Instructions:" -ForegroundColor Cyan
Write-Host "1. Repository name: $repoName" -ForegroundColor White
Write-Host "2. Description: (optional) Next.js 15 website for Ivan Remodeling LLC" -ForegroundColor White
Write-Host "3. Visibility: Choose Public or Private" -ForegroundColor White
Write-Host "4. ⚠️  IMPORTANT: DO NOT check:" -ForegroundColor Yellow
Write-Host "   - ❌ Add a README file" -ForegroundColor Red
Write-Host "   - ❌ Add .gitignore" -ForegroundColor Red
Write-Host "   - ❌ Choose a license" -ForegroundColor Red
Write-Host "5. Click 'Create repository'" -ForegroundColor White

Write-Host "`n⏳ Waiting for you to create the repository..." -ForegroundColor Yellow
Write-Host "   (Press Enter after you've created it on GitHub)" -ForegroundColor Gray
Read-Host "Press Enter to continue"

Write-Host "`n📝 Enter your GitHub username:" -ForegroundColor Cyan
$username = Read-Host "Username"

if (-not $username) {
    Write-Host "❌ Username is required" -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$username/$repoName.git"

Write-Host "`n🔗 Adding remote repository..." -ForegroundColor Yellow
Write-Host "   URL: $repoUrl" -ForegroundColor Gray

git remote add origin $repoUrl 2>&1 | Out-Null

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote added successfully!" -ForegroundColor Green
    
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    Write-Host "   (You may be prompted for credentials)" -ForegroundColor Gray
    
    git push -u origin main 2>&1 | Tee-Object -Variable pushOutput
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "`n🌐 Repository URL: $repoUrl" -ForegroundColor Cyan
        Write-Host "`n🎉 Your code is now on GitHub!" -ForegroundColor Green
        Write-Host "`nNext step: Deploy to Vercel at https://vercel.com" -ForegroundColor Yellow
    } else {
        $output = $pushOutput -join "`n"
        Write-Host "`n⚠️  Push encountered an issue" -ForegroundColor Yellow
        
        if ($output -match "authentication|credential|login|password") {
            Write-Host "`n🔐 Authentication required. Options:" -ForegroundColor Cyan
            Write-Host "`nOption 1: GitHub Desktop (Easiest)" -ForegroundColor White
            Write-Host "   1. Download: https://desktop.github.com/" -ForegroundColor Gray
            Write-Host "   2. Sign in with your GitHub account" -ForegroundColor Gray
            Write-Host "   3. File → Add Local Repository" -ForegroundColor Gray
            Write-Host "   4. Select: C:\Users\HP\Desktop\novak" -ForegroundColor Gray
            Write-Host "   5. Click 'Publish repository'" -ForegroundColor Gray
            
            Write-Host "`nOption 2: Personal Access Token" -ForegroundColor White
            Write-Host "   1. Create token: https://github.com/settings/tokens/new" -ForegroundColor Gray
            Write-Host "   2. Select 'repo' scope" -ForegroundColor Gray
            Write-Host "   3. Copy the token" -ForegroundColor Gray
            Write-Host "   4. Run: git push -u origin main" -ForegroundColor Gray
            Write-Host "   5. Username: $username" -ForegroundColor Gray
            Write-Host "   6. Password: (paste your token)" -ForegroundColor Gray
        } else {
            Write-Host "`nError details:" -ForegroundColor Red
            Write-Host $output -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "❌ Failed to add remote. Make sure:" -ForegroundColor Red
    Write-Host "   - The repository exists on GitHub" -ForegroundColor Yellow
    Write-Host "   - The repository name is correct: $repoName" -ForegroundColor Yellow
    Write-Host "   - Your username is correct: $username" -ForegroundColor Yellow
}

Write-Host "`n" -ForegroundColor White
