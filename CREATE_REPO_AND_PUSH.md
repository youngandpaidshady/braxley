# Quick Guide: Create GitHub Repository and Push

## ✅ I've opened the GitHub repository creation page for you!

## Step 1: Create Repository on GitHub

The page should be open in your browser. If not, go to: **https://github.com/new**

**Fill in:**
- **Repository name:** `ivan-remodeling`
- **Description:** (optional) Next.js 15 website for Ivan Remodeling LLC
- **Visibility:** Choose Public or Private
- **⚠️ IMPORTANT:** DO NOT check any of these:
  - ❌ Add a README file
  - ❌ Add .gitignore  
  - ❌ Choose a license

Click **"Create repository"**

## Step 2: Push Your Code

After creating the repository, run this command (replace `YOUR_USERNAME` with your GitHub username):

```powershell
.\auto-create-push.ps1 -Username "YOUR_USERNAME"
```

**Example:**
```powershell
.\auto-create-push.ps1 -Username "johndoe"
```

## Alternative: Manual Push

If you prefer to do it manually:

```powershell
# Add Git to PATH
$env:Path += ";C:\Program Files\Git\bin"

# Navigate to project
cd C:\Users\HP\Desktop\novak

# Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ivan-remodeling.git

# Push
git push -u origin main
```

## Authentication

If you're prompted for credentials:

### Option 1: GitHub Desktop (Easiest)
1. Download: https://desktop.github.com/
2. Sign in
3. File → Add Local Repository
4. Select: `C:\Users\HP\Desktop\novak`
5. Click "Publish repository"

### Option 2: Personal Access Token
1. Create token: https://github.com/settings/tokens/new
2. Select `repo` scope
3. Copy token
4. When pushing, use:
   - Username: your GitHub username
   - Password: your token (not your GitHub password)

---

**After pushing, your code will be on GitHub and ready for Vercel deployment! 🚀**
