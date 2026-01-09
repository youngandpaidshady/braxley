# Favicon Setup Guide

The favicon metadata has been added to `app/layout.tsx`. Now you need to add the actual icon files.

## Required Icon Files

Place these files in the `public/` directory:

### 1. `public/favicon.ico`
- **Format:** ICO
- **Sizes:** 16x16, 32x32, or 48x48 pixels
- **Purpose:** Browser tab icon (legacy support)

### 2. `public/icon.png`
- **Format:** PNG
- **Size:** 512x512 pixels (recommended)
- **Purpose:** Modern browser favicon and PWA icon

### 3. `public/apple-icon.png`
- **Format:** PNG
- **Size:** 180x180 pixels (required by Apple)
- **Purpose:** iOS home screen icon when users add your site

### 4. `public/icon.svg` (Optional but recommended)
- **Format:** SVG
- **Purpose:** Scalable vector icon (best quality at any size)

## How to Create Favicon from Your Logo

Based on your logo description (BN letters in a house outline, bronze/golden brown color), here's how to create the favicon files:

### Option 1: Use an Online Favicon Generator
1. Go to https://realfavicongenerator.net/ or https://favicon.io/
2. Upload your logo image (PNG or SVG)
3. Generate all sizes automatically
4. Download and place files in `public/` folder

### Option 2: Manual Creation
1. **Export your logo as PNG:**
   - 512x512px for `icon.png`
   - 180x180px for `apple-icon.png`
   - 32x32px for `favicon.ico`

2. **Create favicon.ico:**
   - Use an online converter (e.g., https://convertio.co/png-ico/)
   - Or use ImageMagick: `convert icon.png -resize 32x32 favicon.ico`

3. **Create SVG version (recommended):**
   - Export your logo as SVG from your design tool
   - Place as `public/icon.svg`

## File Structure

After adding files, your `public/` folder should have:

```
public/
  ├── favicon.ico
  ├── icon.png
  ├── icon.svg (optional)
  └── apple-icon.png
```

## Current Metadata Configuration

The metadata in `app/layout.tsx` is configured to look for:
- `/favicon.ico` - Legacy favicon
- `/icon.png` - Modern PNG icon (512x512)
- `/icon.svg` - SVG icon (optional)
- `/apple-icon.png` - Apple touch icon (180x180)

## Testing

1. **Clear browser cache** (important!)
   - Chrome: `Ctrl+Shift+Delete` → Clear cached images and files
   - Or use Incognito/Private mode

2. **Hard refresh:**
   - `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check browser tab:**
   - You should see your favicon in the browser tab

4. **Test on mobile:**
   - Add to home screen on iOS → Should show apple-icon.png
   - Add to home screen on Android → Should show icon.png

## Quick Fix for Immediate Testing

If you don't have icon files yet, you can temporarily:

1. Create a simple placeholder PNG (512x512) with your logo
2. Save it as `public/icon.png`
3. Copy the same file as `public/apple-icon.png` and resize to 180x180
4. Convert to `public/favicon.ico` (32x32)

Once you add the actual icon files with your BN logo, the favicon will appear automatically.

## Notes

- Next.js 15 automatically generates the appropriate `<link>` tags from the metadata
- The icons metadata is now in `app/layout.tsx` and will be used once files are added
- Make sure icon files are in the `public/` directory, not `app/` directory (for explicit metadata config)
- Icons should have transparent or solid backgrounds for best results
