# Auto Push to GitHub Script
# Automatically sets up remote and pushes to GitHub

Write-Host "🚀 Auto Push to GitHub" -ForegroundColor Cyan
Write-Host "======================`n" -ForegroundColor Cyan

# Add Git to PATH
$env:Path += ";C:\Program Files\Git\bin"

# Check if Git is available
try {
    git --version | Out-Null
    Write-Host "✅ Git is available" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed" -ForegroundColor Red
    exit 1
}

# Navigate to project directory
Set-Location "C:\Users\HP\Desktop\novak"

# Check if remote exists
$remoteUrl = git remote get-url origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Remote repository found: $remoteUrl" -ForegroundColor Green
    Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
    
    # Try to push
    git push -u origin main 2>&1 | Tee-Object -Variable pushOutput
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "`n🌐 Repository: $remoteUrl" -ForegroundColor Cyan
    } else {
        $output = $pushOutput -join "`n"
        if ($output -match "authentication|credential|login|password") {
            Write-Host "`n⚠️  Authentication required" -ForegroundColor Yellow
            Write-Host "`nYou need to authenticate. Options:" -ForegroundColor Cyan
            Write-Host "1. Use GitHub Desktop (easiest):" -ForegroundColor White
            Write-Host "   - Download: https://desktop.github.com/" -ForegroundColor Gray
            Write-Host "   - Sign in and publish repository" -ForegroundColor Gray
            Write-Host "`n2. Use Personal Access Token:" -ForegroundColor White
            Write-Host "   - Create token: https://github.com/settings/tokens" -ForegroundColor Gray
            Write-Host "   - Use token as password when prompted" -ForegroundColor Gray
            Write-Host "`n3. Configure Git Credential Manager:" -ForegroundColor White
            Write-Host "   git config --global credential.helper manager-core" -ForegroundColor Gray
        } else {
            Write-Host "`n❌ Push failed. Error:" -ForegroundColor Red
            Write-Host $output -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "`n📝 No remote repository configured." -ForegroundColor Yellow
    Write-Host "`nTo set up GitHub repository:" -ForegroundColor Cyan
    
    Write-Host "`n1. Create repository on GitHub:" -ForegroundColor White
    Write-Host "   https://github.com/new" -ForegroundColor Gray
    Write-Host "   (Don't initialize with README)" -ForegroundColor Yellow
    
    Write-Host "`n2. Enter repository details:" -ForegroundColor White
    $username = Read-Host "   GitHub Username"
    $repoName = Read-Host "   Repository Name (default: ivan-remodeling)"
    
    if (-not $repoName) { $repoName = "ivan-remodeling" }
    
    if ($username) {
        $repoUrl = "https://github.com/$username/$repoName.git"
        
        Write-Host "`n🔗 Adding remote repository..." -ForegroundColor Yellow
        git remote add origin $repoUrl 2>&1 | Out-Null
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Remote added: $repoUrl" -ForegroundColor Green
            
            Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
            Write-Host "   (You may be prompted for credentials)" -ForegroundColor Gray
            
            git push -u origin main 2>&1 | Tee-Object -Variable pushOutput
            
            if ($LASTEXITCODE -eq 0) {
                Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
                Write-Host "`n🌐 Repository: $repoUrl" -ForegroundColor Cyan
            } else {
                $output = $pushOutput -join "`n"
                if ($output -match "authentication|credential|login|password") {
                    Write-Host "`n⚠️  Authentication required" -ForegroundColor Yellow
                    Write-Host "`nConfigure credentials using one of these methods:" -ForegroundColor Cyan
                    Write-Host "`nOption 1: GitHub Desktop (Recommended)" -ForegroundColor White
                    Write-Host "   Download: https://desktop.github.com/" -ForegroundColor Gray
                    Write-Host "   Sign in → File → Add Local Repository → Publish" -ForegroundColor Gray
                    Write-Host "`nOption 2: Personal Access Token" -ForegroundColor White
                    Write-Host "   1. Create token: https://github.com/settings/tokens/new" -ForegroundColor Gray
                    Write-Host "   2. Select 'repo' scope" -ForegroundColor Gray
                    Write-Host "   3. Copy token and use as password when pushing" -ForegroundColor Gray
                    Write-Host "`nOption 3: Configure Credential Manager" -ForegroundColor White
                    Write-Host "   git config --global credential.helper manager-core" -ForegroundColor Gray
                    Write-Host "   Then try pushing again" -ForegroundColor Gray
                } else {
                    Write-Host "`n❌ Push failed:" -ForegroundColor Red
                    Write-Host $output -ForegroundColor Yellow
                }
            }
        } else {
            Write-Host "❌ Failed to add remote. Repository may not exist yet." -ForegroundColor Red
            Write-Host "   Make sure you created it at: https://github.com/new" -ForegroundColor Yellow
        }
    } else {
        Write-Host "`n⚠️  No username provided." -ForegroundColor Yellow
    }
}

Write-Host "`n" -ForegroundColor White
