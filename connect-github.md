# Connect to GitHub - Quick Guide

## ✅ Git is installed and your code is committed!

Your changes have been committed locally. Now connect to GitHub:

## Step 1: Create GitHub Repository

1. **Open Chrome** (you're already logged in)
2. Go to: **https://github.com/new**
3. Repository name: `ivan-remodeling` (or your choice)
4. **IMPORTANT:** Do NOT check "Initialize with README"
5. Click **"Create repository"**

## Step 2: Connect & Push

After creating the repository, GitHub will show you commands. Run these in your terminal:

```powershell
# Add Git to PATH for this session
$env:Path += ";C:\Program Files\Git\bin"

# Add your GitHub repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/ivan-remodeling.git

# Push to GitHub
git push -u origin main
```

## Alternative: Use GitHub Desktop

1. Download: https://desktop.github.com/
2. Sign in with your GitHub account
3. File → Add Local Repository
4. Select: `C:\Users\HP\Desktop\novak`
5. Click "Publish repository"

---

## Update Your Git Identity (Optional)

If you want to use your GitHub email/name:

```powershell
$env:Path += ";C:\Program Files\Git\bin"
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## ✅ Current Status

- ✅ Git installed
- ✅ Repository initialized
- ✅ All files committed
- ⏳ Waiting for GitHub connection

