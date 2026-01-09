# PowerShell script to create .env.local file with Resend API key
# Run this script: .\setup-env.ps1

$envContent = @"
# Email Configuration - Resend API
# This file is automatically ignored by git (in .gitignore)

# Resend API Key
RESEND_API_KEY=re_LUGfo2JR_E3a8tRocyMhaBznpJjMz6iFK

# Where to send contact form emails
CONTACT_EMAIL=Braxleynevimllc@outlook.com

# From email address (using Resend's test domain - works immediately without verification)
FROM_EMAIL=onboarding@resend.dev
"@

# Write to .env.local
$envContent | Out-File -FilePath ".env.local" -Encoding utf8 -NoNewline

Write-Host "✅ .env.local file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart your dev server: npm run dev" -ForegroundColor Cyan
Write-Host "2. Test the contact form on your website" -ForegroundColor Cyan
Write-Host "3. Check your email inbox for the test email" -ForegroundColor Cyan
Write-Host ""
Write-Host "For Vercel deployment, add these same variables in:" -ForegroundColor Yellow
Write-Host "   Vercel Dashboard → Your Project → Settings → Environment Variables" -ForegroundColor Cyan
