# Deploying to Namecheap Hosting (cPanel) - Complete Guide

Since you have both **hosting and domain** with Namecheap, here's the complete deployment guide.

## 📋 Pre-Deployment Checklist

- [x] Your site is built for static export (`output: 'export'` in `next.config.ts`)
- [x] Build folder ready: `out` folder contains all files
- [x] `.htaccess` file fixed (excludes `_next` folder from routing)
- [x] Deployment package ready: `website_upload.zip`

---

## 🚀 Step-by-Step Deployment

### Step 1: Access cPanel

1. Log in to [Namecheap.com](https://namecheap.com)
2. Go to **"Hosting List"** → Select your hosting account
3. Click **"Manage"** → **"cPanel"**
4. You'll see the cPanel dashboard

---

### Step 2: Prepare Your Files

Your deployment package is already ready:
- ✅ `website_upload.zip` (contains all files)
- ✅ `.htaccess` (fixed for CSS/JS loading)
- ✅ `_next` folder (with all static assets)

**Verify locally:**
```powershell
# Check the ZIP contains everything
Expand-Archive -Path "website_upload.zip" -DestinationPath "test_extract" -Force
Get-ChildItem "test_extract" | Select-Object Name
# Should see: .htaccess, index.html, _next, projects, blog, img, etc.
```

---

### Step 3: Upload Files to cPanel

**Method A: Using cPanel File Manager (Recommended)**

1. In cPanel, find **"File Manager"** (under Files section)
2. Navigate to `public_html` folder
   - This is your website's root directory
   - If you have multiple domains, use the correct domain folder
3. **Delete existing files** (if any):
   - Select all files in `public_html`
   - Click **"Delete"** (backup first if needed)
4. **Upload the ZIP file:**
   - Click **"Upload"** button
   - Select `website_upload.zip`
   - Wait for upload to complete
5. **Extract the ZIP:**
   - Right-click `website_upload.zip`
   - Select **"Extract"**
   - Extract to `public_html`
6. **Delete the ZIP file** (optional, to save space):
   - Right-click `website_upload.zip` → Delete

**Method B: Using FTP Client (Alternative)**

1. Get FTP credentials from cPanel:
   - cPanel → **"FTP Accounts"** → Create or use existing
   - Note: FTP Host, Username, Password
2. Use FileZilla or similar:
   - Connect to your server
   - Navigate to `public_html`
   - Upload all contents from `deploy_build` folder
   - Ensure `.htaccess` is uploaded (it's a hidden file)

---

### Step 4: Verify File Structure

Your `public_html` should look like this:

```
public_html/
├── .htaccess              ← CRITICAL: Must be present
├── index.html
├── robots.txt
├── sitemap.xml
├── _next/                 ← CRITICAL: Must be present
│   └── static/
│       ├── css/           ← CSS files here
│       └── chunks/        ← JavaScript files here
├── projects/
│   ├── index.html
│   └── [project-slugs]/
├── blog/
│   └── index.html
└── img/
    ├── about.jpg
    ├── ceo.jpg
    └── projects/
```

**Check in File Manager:**
- ✅ `.htaccess` file exists (may be hidden - enable "Show Hidden Files")
- ✅ `_next` folder exists
- ✅ `_next/static/css/` has CSS files
- ✅ `_next/static/chunks/` has JS files

---

### Step 5: Set File Permissions

1. In File Manager, select `.htaccess`
2. Right-click → **"Change Permissions"**
3. Set to: `644` (readable by web server)
4. Click **"Change Permissions"**

For `_next` folder:
1. Select `_next` folder
2. Right-click → **"Change Permissions"**
3. Set to: `755` (executable by web server)
4. Click **"Change Permissions"**

**Permission Reference:**
- Files: `644` (owner: read/write, others: read)
- Folders: `755` (owner: read/write/execute, others: read/execute)

---

### Step 6: Configure Domain (If Not Already Done)

1. In Namecheap, go to **"Domain List"**
2. Select your domain → **"Manage"**
3. Go to **"Advanced DNS"** tab
4. Ensure these records exist:

**A Record (Root Domain):**
```
Type: A Record
Host: @
Value: [Your Namecheap hosting IP - get from cPanel]
TTL: Automatic
```

**CNAME (WWW):**
```
Type: CNAME
Host: www
Value: yourdomain.com
TTL: Automatic
```

**To find your hosting IP:**
- cPanel → **"Server Information"** → Look for "Shared IP Address"

---

### Step 7: Test Your Website

1. **Visit your domain:** `https://yourdomain.com`
2. **Open Developer Tools (F12):**
   - Go to **Network** tab
   - Refresh the page
   - Check these files load (Status 200):
     - `/_next/static/css/*.css`
     - `/_next/static/chunks/*.js`
3. **Test pages:**
   - Homepage: `https://yourdomain.com/`
   - Projects: `https://yourdomain.com/projects/`
   - Blog: `https://yourdomain.com/blog/`
   - Project detail: `https://yourdomain.com/projects/[any-project]/`

---

### Step 8: Enable SSL (HTTPS)

1. In cPanel, find **"SSL/TLS"** or **"Let's Encrypt SSL"**
2. Click **"Manage SSL Sites"**
3. Select your domain
4. Click **"Run AutoSSL"** or **"Install"**
5. Wait for SSL certificate to be issued (usually 5-10 minutes)
6. Your site will be accessible via `https://yourdomain.com`

**Note:** Some Namecheap plans include free SSL automatically.

---

## 🔍 Troubleshooting

### Issue: Blank Screen
**Check:**
- ✅ `.htaccess` file is in `public_html` root
- ✅ `_next` folder is uploaded
- ✅ File permissions are correct (644 for files, 755 for folders)
- ✅ Browser console for errors (F12)

**Fix:**
- Re-upload `.htaccess` file
- Verify `_next` folder structure is intact
- Check cPanel error logs: cPanel → Metrics → Errors

---

### Issue: CSS/JS Not Loading (404 errors)
**Check:**
- ✅ `_next` folder exists in `public_html`
- ✅ `_next/static/css/` has files
- ✅ `_next/static/chunks/` has files
- ✅ `.htaccess` excludes `_next` folder

**Fix:**
- Verify `.htaccess` content (should exclude `_next`)
- Check file permissions on `_next` folder (should be 755)
- Test direct URL: `https://yourdomain.com/_next/static/css/[filename].css`

---

### Issue: Pages Show 404
**Check:**
- ✅ `.htaccess` routing rules are correct
- ✅ `index.html` files exist in subfolders (projects/, blog/)

**Fix:**
- Verify `.htaccess` has routing rules
- Check that `projects/index.html` exists
- Clear browser cache

---

### Issue: Images Not Loading
**Check:**
- ✅ `img` folder is uploaded
- ✅ Image paths in HTML are correct

**Fix:**
- Verify `img` folder structure matches code
- Check image file names match exactly (case-sensitive)

---

## 📝 Quick Verification Commands

After uploading, test these URLs directly:

1. **Homepage:**
   ```
   https://yourdomain.com/
   ```
   Should show: Full website with styling

2. **CSS File:**
   ```
   https://yourdomain.com/_next/static/css/[any-css-file].css
   ```
   Should show: CSS code (not 404)

3. **JavaScript File:**
   ```
   https://yourdomain.com/_next/static/chunks/[any-js-file].js
   ```
   Should show: JavaScript code (not 404)

4. **Projects Page:**
   ```
   https://yourdomain.com/projects/
   ```
   Should show: Projects listing page

---

## ✅ Post-Deployment Checklist

- [ ] Website loads at `https://yourdomain.com`
- [ ] CSS files load (check Network tab - Status 200)
- [ ] JavaScript files load (check Network tab - Status 200)
- [ ] All pages accessible (Home, Projects, Blog)
- [ ] Images display correctly
- [ ] Mobile version works
- [ ] SSL certificate active (HTTPS works)
- [ ] Forms work (if applicable)
- [ ] No console errors (F12 → Console)

---

## 🔄 Updating Your Site

When you make changes:

1. **Rebuild locally:**
   ```bash
   npm run build
   ```

2. **Create new ZIP:**
   ```bash
   # Copy out folder to deploy_build
   Copy-Item -Path "out\*" -Destination "deploy_build\" -Recurse -Force
   # Create new ZIP
   Compress-Archive -Path "deploy_build\*" -DestinationPath "website_upload.zip" -Force
   ```

3. **Upload to cPanel:**
   - Delete old files in `public_html` (or just overwrite)
   - Upload new `website_upload.zip`
   - Extract to `public_html`
   - Delete ZIP file

---

## 📞 Need Help?

**If something doesn't work:**

1. **Check cPanel Error Logs:**
   - cPanel → Metrics → Errors
   - Look for recent errors

2. **Test `.htaccess` syntax:**
   - Temporarily rename `.htaccess` to `.htaccess.bak`
   - If site loads (without routing), `.htaccess` has syntax error
   - Restore and fix

3. **Contact Namecheap Support:**
   - Ask if `mod_rewrite` is enabled
   - Ask if `.htaccess` files are allowed
   - Provide `.htaccess` content for review

---

## 🎯 Summary

**You're all set!** Your deployment package (`website_upload.zip`) is ready with:
- ✅ Fixed `.htaccess` (CSS/JS will load)
- ✅ All static files
- ✅ Proper folder structure
- ✅ Content visible by default (no blank screen)

**Just upload to `public_html` and you're done!**
