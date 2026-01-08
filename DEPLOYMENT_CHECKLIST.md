# Namecheap Deployment Checklist

## ✅ Pre-Deployment Verification

- [x] Project built successfully with static export
- [x] All linting errors fixed
- [x] TypeScript errors resolved
- [x] Unused files removed
- [x] Source maps removed
- [x] Deployment package created (`deploy_build/`)
- [x] ZIP file created (`website_upload.zip`)

## 📦 Deployment Package Contents

The `website_upload.zip` file contains:
- ✅ `index.html` - Homepage (required)
- ✅ All static assets (CSS, JS, images)
- ✅ All project pages
- ✅ SEO files (sitemap.xml, robots.txt)
- ✅ Optimized and minified code
- ✅ No development files (.git, node_modules, source maps)

## 🚀 Deployment Steps

### Step 1: Access Namecheap cPanel
1. Log in to [namecheap.com](https://namecheap.com)
2. Go to **"Hosting List"** → Select your hosting account
3. Click **"Manage"** → **"cPanel"**

### Step 2: Upload ZIP File
1. In cPanel, go to **"File Manager"**
2. Navigate to **`public_html`** folder (or your domain's root folder)
3. Click **"Upload"** button
4. Select `website_upload.zip`
5. Wait for upload to complete

### Step 3: Extract Files
1. In File Manager, locate `website_upload.zip`
2. Right-click → **"Extract"**
3. Extract to `public_html` (or current directory)
4. **IMPORTANT:** Ensure `index.html` is directly in `public_html`, not in a subfolder

### Step 4: Verify File Structure
Your `public_html` should contain:
```
public_html/
├── index.html          ← MUST be here
├── _next/
├── img/
├── robots.txt
├── sitemap.xml
└── [other static files]
```

### Step 5: Set Permissions (if needed)
1. Select all files in `public_html`
2. Right-click → **"Change Permissions"**
3. Set to **644** for files, **755** for directories
4. Click **"Change Permissions"**

### Step 6: Test Your Website
1. Visit your domain: `https://yourdomain.com`
2. Check homepage loads correctly
3. Test navigation links
4. Verify images load
5. Test all pages (Projects, Blog, Contact)

## 🔧 Troubleshooting

### Website shows "Index of /" or blank page
- **Solution:** Ensure `index.html` is in `public_html` root, not in a subfolder
- Check file permissions (should be 644)

### Images not loading
- **Solution:** Verify `img/` folder was extracted correctly
- Check image paths are relative (not absolute)
- Clear browser cache

### 404 errors on pages
- **Solution:** Ensure all files from `deploy_build` were extracted
- Check `.htaccess` file if using Apache (may need to configure)

### CSS/JS not loading
- **Solution:** Check `_next/` folder exists and contains files
- Verify file permissions
- Check browser console for specific errors

## 📋 Post-Deployment Checklist

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Images display properly
- [ ] Projects page loads
- [ ] Individual project pages work
- [ ] Contact form functions
- [ ] Mobile responsive design works
- [ ] SEO files accessible (robots.txt, sitemap.xml)
- [ ] SSL certificate active (HTTPS)
- [ ] Google Search Console configured
- [ ] Analytics tracking (if applicable)

## 🔗 Important URLs to Test

- `https://yourdomain.com` - Homepage
- `https://yourdomain.com/projects` - Projects listing
- `https://yourdomain.com/projects/manhattan-skyline-penthouse` - Project detail
- `https://yourdomain.com/contact` - Contact page
- `https://yourdomain.com/blog` - Blog page
- `https://yourdomain.com/robots.txt` - Robots file
- `https://yourdomain.com/sitemap.xml` - Sitemap

## 📞 Support

If you encounter issues:
1. Check Namecheap knowledge base
2. Contact Namecheap support
3. Review browser console for errors
4. Verify all files were uploaded correctly

---

**Deployment Package Location:** `website_upload.zip`  
**Package Size:** Check file size in File Manager  
**Ready for Upload:** ✅ YES
