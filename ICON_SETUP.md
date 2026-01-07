# Icon & Manifest Setup Guide

This guide explains where to place icon files in Next.js 15 App Router to ensure your site looks like a native app when saved to mobile home screens.

## File Structure

Place the following files in the `app/` directory:

```
app/
  ├── favicon.ico          # Traditional favicon (16x16 or 32x32)
  ├── icon.png             # App icon (512x512 recommended)
  ├── apple-icon.png       # Apple touch icon (180x180)
  └── manifest.json        # Web app manifest (optional, but recommended)
```

## File Specifications

### 1. `favicon.ico`
- **Location:** `app/favicon.ico`
- **Size:** 16x16, 32x32, or 48x48 pixels
- **Format:** ICO
- **Purpose:** Browser tab icon

### 2. `icon.png` (or `icon.svg`)
- **Location:** `app/icon.png` or `app/icon.svg`
- **Size:** 512x512 pixels (recommended)
- **Format:** PNG or SVG
- **Purpose:** Next.js automatically generates various sizes for different devices
- **Note:** Next.js 15 will automatically create:
  - `icon-192.png`
  - `icon-512.png`
  - And other sizes as needed

### 3. `apple-icon.png`
- **Location:** `app/apple-icon.png`
- **Size:** 180x180 pixels (required by Apple)
- **Format:** PNG
- **Purpose:** Icon when users add your site to iOS home screen
- **Note:** Next.js automatically generates the proper `<link>` tag

## Optional: Advanced Icon Configuration

For more control, you can create an `icon.tsx` or `icon.ts` file:

```typescript
// app/icon.tsx
import { ImageResponse } from 'next/og'

export const size = {
  width: 512,
  height: 512,
}

export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #1e293b 0%, #fb923c 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}
      >
        IR
      </div>
    ),
    {
      ...size,
    }
  )
}
```

## Web App Manifest (Optional but Recommended)

Create `app/manifest.ts` for PWA support:

```typescript
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ivan Remodeling LLC',
    short_name: 'Ivan Remodeling',
    description: 'Elite craftsmanship in residential remodeling',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#fb923c', // Your accent color
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
```

## Testing

1. **Desktop:** Check browser tab for favicon
2. **Mobile (iOS):** Add to home screen and verify apple-icon appears
3. **Mobile (Android):** Add to home screen and verify icon appears
4. **PWA:** Test install prompt and home screen icon

## Quick Setup Checklist

- [ ] Create `app/favicon.ico` (16x16 or 32x32)
- [ ] Create `app/icon.png` (512x512)
- [ ] Create `app/apple-icon.png` (180x180)
- [ ] (Optional) Create `app/manifest.ts` for PWA support
- [ ] Test on iOS device (add to home screen)
- [ ] Test on Android device (add to home screen)

## Notes

- Next.js 15 automatically detects these files and generates the appropriate `<link>` tags
- Icons should have transparent backgrounds for best results
- Use high-quality images to avoid pixelation
- Consider using SVG for `icon.svg` for better scalability (Next.js supports this)

