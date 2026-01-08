# cPanel Deployment Fix Guide

## Common Issues and Solutions

### Issue 1: "Page Not Found" or Blank Page

**Solution:**
1. **Verify `index.html` is in root:**
   - In cPanel File Manager, go to `public_html`
   - Ensure `index.html` is directly in `public_html`, NOT in a subfolder
   - Path should be: `public_html/index.html` ✅
   - NOT: `public_html/website/index.html` ❌

2. **Upload `.htaccess` file:**
   - The `.htaccess` file is now included in `deploy_build/`
   - Upload it to `public_html` along with other files
   - This file handles routing for Next.js static sites

### Issue 2: CSS/JS Files Not Loading (404 errors)

**Solution:**
1. **Check file paths:**
   - All files from `_next` folder must be uploaded
   - Path should be: `public_html/_next/...`
   - NOT: `public_html/website/_next/...`

2. **Verify file permissions:**
   - Files: `644`
   - Folders: `755`
   - In cPanel File Manager: Right-click → Change Permissions

### Issue 3: Images Not Showing

**Solution:**
1. **Check `img` folder:**
   - Ensure `img` folder is in `public_html`
   - Path: `public_html/img/...`

2. **Verify image paths in HTML:**
   - Should start with `/img/...` (absolute path)
   - NOT `./img/...` or `img/...` (relative path)

### Issue 4: Routes Not Working (404 on navigation)

**Solution:**
1. **Ensure `.htaccess` is uploaded:**
   - File must be named exactly `.htaccess` (with the dot)
   - Must be in `public_html` root
   - Contains rewrite rules for client-side routing

2. **Check mod_rewrite is enabled:**
   - Contact Namecheap support if needed
   - Most shared hosting has it enabled by default

## Step-by-Step Upload Process

### Method 1: Upload ZIP and Extract

1. **Upload `website_upload.zip` to cPanel:**
   - Go to File Manager → `public_html`
   - Click "Upload"
   - Select `website_upload.zip`
   - Wait for upload

2. **Extract ZIP:**
   - Right-click `website_upload.zip`
   - Select "Extract"
   - Extract to `public_html` (current directory)
   - **IMPORTANT:** Extract HERE, not into a subfolder

3. **Verify structure:**
   ```
   public_html/
   ├── .htaccess          ← Must be here
   ├── index.html         ← Must be here
   ├── _next/            ← Must be here
   ├── img/              ← Must be here
   ├── robots.txt
   ├── sitemap.xml
   └── [other files]
   ```

4. **Delete ZIP file:**
   - After extraction, delete `website_upload.zip`

### Method 2: Upload Individual Files (FTP)

1. **Connect via FTP:**
   - Use FileZilla or similar
   - Connect to your server
   - Navigate to `public_html`

2. **Upload all files:**
   - Upload entire contents of `deploy_build/` folder
   - Maintain folder structure
   - Ensure `.htaccess` is uploaded (it's hidden by default)

3. **Set permissions:**
   - Files: `644`
   - Folders: `755`

## Verification Checklist

After uploading, verify:

- [ ] `index.html` exists in `public_html/`
- [ ] `.htaccess` exists in `public_html/`
- [ ] `_next` folder exists in `public_html/`
- [ ] `img` folder exists in `public_html/`
- [ ] File permissions are correct (644/755)
- [ ] No subfolders (files should be directly in `public_html`)

## Testing

1. **Visit your domain:**
   - `https://yourdomain.com`
   - Should show homepage

2. **Check browser console (F12):**
   - Look for 404 errors
   - Check Network tab for failed requests

3. **Test navigation:**
   - Click links
   - Should navigate without 404 errors

## Still Not Working?

1. **Check cPanel error logs:**
   - cPanel → Errors
   - Look for specific error messages

2. **Contact Namecheap support:**
   - Provide error messages
   - Ask about mod_rewrite support
   - Verify PHP version (if applicable)

3. **Try alternative:**
   - Consider using Vercel (free, optimized for Next.js)
   - Point Namecheap domain to Vercel
   - See `DEPLOYMENT_GUIDE.md` for details
