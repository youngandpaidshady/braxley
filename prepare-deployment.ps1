# PowerShell script to prepare deployment package for Namecheap hosting
# This script will clean, build, and package the Next.js static export

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Namecheap Deployment Preparation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous builds
Write-Host "[1/7] Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path "out") {
    Remove-Item -Recurse -Force "out"
    Write-Host "   ✓ Removed 'out' directory" -ForegroundColor Green
}
if (Test-Path "deploy_build") {
    Remove-Item -Recurse -Force "deploy_build"
    Write-Host "   ✓ Removed 'deploy_build' directory" -ForegroundColor Green
}
if (Test-Path "website_upload.zip") {
    Remove-Item -Force "website_upload.zip"
    Write-Host "   ✓ Removed previous ZIP file" -ForegroundColor Green
}
if (Test-Path ".next") {
    Remove-Item -Recurse -Force ".next"
    Write-Host "   ✓ Removed '.next' directory" -ForegroundColor Green
}

# Step 2: Install dependencies
Write-Host "[2/7] Installing dependencies..." -ForegroundColor Yellow
npm install --production=false
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ Failed to install dependencies" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Dependencies installed" -ForegroundColor Green

# Step 3: Build static export
Write-Host "[3/7] Building static export..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ Build failed" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Build completed successfully" -ForegroundColor Green

# Step 4: Verify build output
Write-Host "[4/7] Verifying build output..." -ForegroundColor Yellow
if (-not (Test-Path "out")) {
    Write-Host "   ✗ Build output 'out' directory not found" -ForegroundColor Red
    exit 1
}
if (-not (Test-Path "out/index.html")) {
    Write-Host "   ✗ index.html not found in build output" -ForegroundColor Red
    exit 1
}
Write-Host "   ✓ Build output verified" -ForegroundColor Green

# Step 5: Create deploy_build directory
Write-Host "[5/7] Creating deployment package..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path "deploy_build" | Out-Null

# Copy all files from 'out' to 'deploy_build'
Copy-Item -Path "out\*" -Destination "deploy_build\" -Recurse -Force
Write-Host "   ✓ Files copied to deploy_build" -ForegroundColor Green

# Step 6: Remove unnecessary files from deploy_build
Write-Host "[6/7] Cleaning deployment package..." -ForegroundColor Yellow

# Remove source maps if they exist
$mapFiles = Get-ChildItem -Path "deploy_build" -Recurse -Filter "*.map" -ErrorAction SilentlyContinue
if ($mapFiles) {
    $mapFiles | Remove-Item -Force
    Write-Host "   ✓ Removed source maps" -ForegroundColor Green
}

# Remove any .git directories
$gitDirs = Get-ChildItem -Path "deploy_build" -Recurse -Directory -Filter ".git" -ErrorAction SilentlyContinue
if ($gitDirs) {
    $gitDirs | Remove-Item -Recurse -Force
    Write-Host "   ✓ Removed .git directories" -ForegroundColor Green
}

# Remove any node_modules if accidentally copied
$nodeModulesPath = Join-Path "deploy_build" "node_modules"
if (Test-Path $nodeModulesPath) {
    Remove-Item -Recurse -Force $nodeModulesPath
    Write-Host "   ✓ Removed node_modules" -ForegroundColor Green
}

# Step 7: Create ZIP file
Write-Host "[7/7] Creating ZIP archive..." -ForegroundColor Yellow
Compress-Archive -Path "deploy_build\*" -DestinationPath "website_upload.zip" -Force
if ($LASTEXITCODE -ne 0) {
    Write-Host "   ✗ Failed to create ZIP file" -ForegroundColor Red
    exit 1
}

# Calculate ZIP file size
$zipSize = (Get-Item "website_upload.zip").Length / 1MB
Write-Host "   ✓ ZIP file created: website_upload.zip ($([math]::Round($zipSize, 2)) MB)" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Deployment Package Ready!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Upload 'website_upload.zip' to Namecheap cPanel" -ForegroundColor White
Write-Host "2. Extract to public_html folder" -ForegroundColor White
Write-Host "3. Verify index.html is in the root of public_html" -ForegroundColor White
Write-Host "4. Test your website" -ForegroundColor White
Write-Host ""
Write-Host "Package Location: $PWD\website_upload.zip" -ForegroundColor Cyan
Write-Host ""
