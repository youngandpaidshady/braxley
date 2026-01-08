# cPanel Deployment Fix - JS and CSS Not Loading

## Problem
JavaScript and CSS files are not loading on cPanel because the `.htaccess` file was redirecting ALL requests (including static assets) to `index.html`.

## Solution Applied

### 1. Fixed `.htaccess` File
The `.htaccess` now properly excludes `_next` folder and static assets from routing:

```apache
# CRITICAL: Exclude _next folder and static assets from routing
RewriteCond %{REQUEST_URI} ^/_next/ [OR]
RewriteCond %{REQUEST_URI} \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot|webp|avif|json|xml|txt|pdf)$ [NC]
RewriteRule ^ - [L]
```

This ensures:
- `/_next/static/css/*.css` files load correctly
- `/_next/static/chunks/*.js` files load correctly
- All image and font files load correctly
- Only page routes (not files) get redirected to `index.html`

## Deployment Steps for cPanel

### Step 1: Upload Files
1. Log in to cPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your domain's root folder)
4. **Delete all existing files** (or backup first)
5. Upload the entire contents of `deploy_build` folder:
   - `index.html`
   - `_next/` folder (with all subfolders)
   - `projects/` folder
   - `blog/` folder
   - `img/` folder
   - `.htaccess` file
   - `robots.txt`
   - `sitemap.xml`

### Step 2: Verify File Structure
Your `public_html` should look like this:
```
public_html/
├── .htaccess          ← CRITICAL: Must be present
├── index.html
├── robots.txt
├── sitemap.xml
├── _next/             ← CRITICAL: Must be present
│   └── static/
│       ├── css/
│       └── chunks/
├── projects/
├── blog/
└── img/
```

### Step 3: Set File Permissions
1. In File Manager, select `.htaccess`
2. Right-click → **Change Permissions**
3. Set to: `644` (readable by web server)
4. For `_next` folder: `755` (executable by web server)

### Step 4: Test
1. Visit your domain: `https://yourdomain.com`
2. Open browser Developer Tools (F12)
3. Go to **Network** tab
4. Refresh the page
5. Check if these files load (Status 200):
   - `/_next/static/css/*.css`
   - `/_next/static/chunks/*.js`

### Step 5: Common Issues & Fixes

#### Issue: 404 errors for `/_next/static/...`
**Fix:** 
- Verify `_next` folder is uploaded to `public_html`
- Check file permissions (should be 755 for folders, 644 for files)
- Verify `.htaccess` is in `public_html` root

#### Issue: Still getting blank screen
**Fix:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors
- Verify `.htaccess` syntax is correct (no typos)

#### Issue: CSS loads but JS doesn't (or vice versa)
**Fix:**
- Check file permissions on `_next/static/` folder
- Verify all files uploaded correctly (check file sizes)
- Try accessing a file directly: `https://yourdomain.com/_next/static/css/[filename].css`

## File Upload Checklist

- [ ] `.htaccess` file uploaded to root
- [ ] `index.html` uploaded to root
- [ ] `_next/` folder uploaded (with all subfolders)
- [ ] `projects/` folder uploaded
- [ ] `blog/` folder uploaded
- [ ] `img/` folder uploaded
- [ ] `robots.txt` uploaded
- [ ] `sitemap.xml` uploaded
- [ ] File permissions set correctly
- [ ] Tested in browser (check Network tab)

## Quick Test Commands

After uploading, test these URLs directly:
- `https://yourdomain.com/_next/static/css/[any-css-file].css` → Should show CSS content
- `https://yourdomain.com/_next/static/chunks/[any-js-file].js` → Should show JavaScript code
- `https://yourdomain.com/` → Should show the homepage

If the first two return 404, the `_next` folder isn't accessible. Check:
1. Folder uploaded correctly
2. File permissions
3. `.htaccess` configuration

## Still Not Working?

1. **Check cPanel Error Logs:**
   - cPanel → Metrics → Errors
   - Look for `.htaccess` syntax errors

2. **Test `.htaccess` syntax:**
   - Temporarily rename `.htaccess` to `.htaccess.bak`
   - If site loads (without routing), `.htaccess` has a syntax error
   - Restore and fix the syntax

3. **Contact Hosting Support:**
   - Ask if `mod_rewrite` is enabled
   - Ask if `.htaccess` files are allowed
   - Provide the `.htaccess` content for review
