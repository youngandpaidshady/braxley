# Git & GitHub Setup Guide

## Step 1: Install Git

1. Download Git for Windows: https://git-scm.com/download/win
2. Run the installer (use default settings)
3. **Restart your terminal/VS Code** after installation

## Step 2: Initialize Repository & First Commit

After Git is installed, open a new terminal in VS Code and run:

```bash
# Initialize the repository
git init

# Add all files
git add .

# Create your first commit
git commit -m "Initial commit: Ivan Remodeling LLC website

- Complete Next.js 15 production-ready website
- Dark/Light mode with ThemeProvider
- Responsive mobile-first design
- SEO optimized with JSON-LD structured data
- Fixed hydration errors in ScrollProgress and SectionTracker
- Services cards with dark mode visibility
- Blueprint-style contact forms
- Architectural magazine blog page
- All components production-ready"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ivan-remodeling` (or your preferred name)
3. **Don't** initialize with README, .gitignore, or license (we already have these)
4. Click "Create repository"

## Step 4: Connect to GitHub & Push

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add the remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/ivan-remodeling.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using GitHub Desktop

If you prefer a GUI:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in
3. File → Add Local Repository
4. Select your project folder
5. Commit your changes
6. Publish to GitHub

---

## Quick Reference: Future Commits

After initial setup, for future changes:

```bash
git add .
git commit -m "Your commit message here"
git push
```

---

## Current Changes Ready to Commit

The following improvements are ready to be committed:

✅ Fixed hydration errors in ScrollProgress and SectionTracker
✅ Fixed Services Card dark mode visibility
✅ Updated Blog page with architectural magazine style
✅ Restyled Contact forms to blueprint/structural design
✅ All components production-ready

