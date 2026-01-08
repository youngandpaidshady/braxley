# Blank Screen Fix - cPanel Deployment

## Problem
The website shows a blank screen on cPanel after deployment.

## Root Cause
The preloader component hides content with `opacity: 0` and `visibility: hidden` until JavaScript completes. If JavaScript fails to load or execute, the content remains hidden.

## Solutions Applied

### 1. Preloader Timeout Fallback
- Added 3-second timeout in `PreloaderProvider.tsx`
- Content automatically shows after 3 seconds even if preloader doesn't complete
- Prevents infinite blank screen

### 2. Noscript Fallback
- Added `<noscript>` tag in `layout.tsx`
- Shows content immediately if JavaScript is disabled
- Ensures basic HTML is visible

### 3. CSS Animation Fallback
- Added CSS animation in `globals.css`
- Forces content visibility after 3 seconds
- Works even if JavaScript fails completely

### 4. JavaScript Detection
- Added `js-enabled` class to `<html>` tag
- Allows CSS to detect if JavaScript is working
- Provides fallback styling for non-JS scenarios

## Testing Checklist

After uploading to cPanel:

1. **Check Browser Console (F12)**
   - Look for 404 errors on `/_next/` files
   - Check for JavaScript errors
   - Verify all scripts are loading

2. **Verify File Structure**
   ```
   public_html/
   ├── index.html
   ├── _next/
   │   └── static/
   │       ├── chunks/
   │       └── css/
   ├── .htaccess
   └── img/
   ```

3. **Test Scenarios**
   - Normal load (should show preloader briefly)
   - Slow connection (should show content after 3s)
   - JavaScript disabled (should show content immediately)
   - JavaScript errors (should show content after 3s)

## If Still Blank

1. **Check File Permissions**
   - Files: `644`
   - Folders: `755`

2. **Verify .htaccess**
   - Must be in `public_html` root
   - Check for syntax errors

3. **Check Browser Console**
   - Look for specific error messages
   - Check Network tab for failed requests

4. **Test Direct File Access**
   - Try: `yourdomain.com/_next/static/css/[filename].css`
   - If 404, files aren't uploaded correctly

5. **Contact Support**
   - Provide browser console errors
   - Check cPanel error logs
   - Verify mod_rewrite is enabled

## Alternative: Disable Preloader

If issues persist, you can disable the preloader entirely:

1. Edit `components/PreloaderProvider.tsx`
2. Change `useState(true)` to `useState(false)`
3. Rebuild and redeploy
