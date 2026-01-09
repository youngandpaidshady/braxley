# Create Favicon Files from Your Logo Image

You have the BN logo image. Here's how to create all the favicon files needed:

## Quick Setup (Recommended)

### Option 1: Online Favicon Generator (Easiest)

1. **Go to:** https://realfavicongenerator.net/
2. **Upload your logo image** (the one with BN in house outline)
3. **Configure:**
   - Check "Use this image as is" or adjust settings
   - Background color: Dark charcoal (#2a2a2a)
   - Border: Light beige (#f5f5dc)
4. **Generate** all sizes
5. **Download** the package
6. **Extract** and place files in `public/` folder:
   - `favicon.ico` → `public/favicon.ico`
   - `apple-touch-icon.png` → `public/apple-icon.png`
   - `android-chrome-512x512.png` → `public/icon.png`

### Option 2: Manual Creation

If you have the logo file (PNG/SVG), follow these steps:

#### Step 1: Prepare Base Image
- Export/save your logo as high-resolution PNG or SVG
- Make sure it's at least 512x512px

#### Step 2: Create `public/favicon.ico`
- Use: https://convertio.co/png-ico/
- Upload your logo
- Select 32x32 or 48x48 size
- Download as `favicon.ico`
- Place in `public/` folder

#### Step 3: Create `public/icon.png`
- Resize your logo to 512x512px
- Save as `icon.png`
- Place in `public/` folder

#### Step 4: Create `public/apple-icon.png`
- Resize your logo to 180x180px
- Save as `apple-icon.png`
- Place in `public/` folder

#### Step 5: Create `public/icon.svg` (Already Created)
- ✅ Already created as SVG version
- Matches your logo description
- No action needed (already in `public/icon.svg`)

## Current Status

✅ **icon.svg** - Created and ready (matches your BN logo design)
⏳ **favicon.ico** - Needs to be created from your logo
⏳ **icon.png** - Needs to be created from your logo  
⏳ **apple-icon.png** - Needs to be created from your logo

## Testing After Adding Files

1. **Clear browser cache:**
   - Chrome: `Ctrl+Shift+Delete` → Clear cached images
   - Or use Incognito mode

2. **Hard refresh:**
   - `Ctrl+F5` (Windows) or `Cmd+Shift+R` (Mac)

3. **Check browser tab** - You should see your BN logo!

4. **Test on mobile:**
   - Add to home screen → Should show your logo

## File Specifications

- **favicon.ico**: 32x32px or 48x48px, ICO format
- **icon.png**: 512x512px, PNG format
- **apple-icon.png**: 180x180px, PNG format
- **icon.svg**: Already created ✅

## Current Metadata Configuration

The `app/layout.tsx` is configured to use:
- `/icon.svg` (priority - already created ✅)
- `/favicon.ico` (fallback)
- `/icon.png` (modern browsers)
- `/apple-icon.png` (iOS)

Once you add the PNG and ICO files, all browsers will display your BN logo!
