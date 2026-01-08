# Namecheap Hosting Deployment Guide

This guide will help you deploy your Next.js website to Namecheap hosting.

## ⚠️ Important: Namecheap Hosting Types

Namecheap offers different hosting types. Your Next.js app needs **Node.js support**:

- ✅ **Namecheap VPS** - Supports Node.js (Recommended)
- ✅ **Namecheap Dedicated Server** - Full control
- ❌ **Namecheap Shared Hosting** - Usually doesn't support Node.js
- ✅ **Namecheap Shared Hosting with Node.js** - If available in your plan

## 🔍 Step 1: Check Your Hosting Type

1. Log in to [Namecheap.com](https://namecheap.com)
2. Go to **"Hosting List"** → Select your hosting account
3. Check if you have **Node.js** or **SSH access**

### If you have Node.js/SSH access → Follow **Option A**
### If you only have Shared Hosting → Follow **Option B** (Static Export)

---

## 🚀 Option A: Deploy Next.js to Namecheap VPS/Node.js Hosting

### Step 1: Prepare Your Project

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Test the build locally:**
   ```bash
   npm start
   ```
   Make sure it works on `http://localhost:3000`

### Step 2: Connect to Your Namecheap Server

**Via SSH (if available):**
```bash
ssh username@your-server-ip
```

**Via cPanel File Manager:**
- Log in to cPanel
- Go to "File Manager"
- Navigate to `public_html` or your domain folder

### Step 3: Upload Your Project

**Method 1: Using Git (Recommended if SSH available)**
```bash
# On your server
cd /home/username/public_html
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install --production
npm run build
```

**Method 2: Using FTP/SFTP**
1. Install FileZilla or similar FTP client
2. Connect to your Namecheap server
3. Upload entire project folder to `public_html` or your domain folder
4. Via SSH or cPanel Terminal, run:
   ```bash
   cd public_html/your-project
   npm install --production
   npm run build
   ```

### Step 4: Configure Node.js in cPanel

1. Log in to **cPanel**
2. Find **"Node.js"** or **"Node.js Selector"** app
3. Create a new Node.js application:
   - **Node.js version:** 18.x or 20.x (latest LTS)
   - **Application root:** `/home/username/public_html/your-project`
   - **Application URL:** Your domain
   - **Application startup file:** `server.js` or `server/index.js`
   - **Application mode:** Production

### Step 5: Create Startup File

Create `server.js` in your project root:

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

### Step 6: Set Environment Variables

In cPanel Node.js app settings, add:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
PORT=3000
```

### Step 7: Start the Application

In cPanel Node.js app:
1. Click **"Start App"**
2. Your site should be live!

---

## 📦 Option B: Static Export (For Shared Hosting Without Node.js)

If your Namecheap hosting doesn't support Node.js, you can export a static version.

### Step 1: Configure Next.js for Static Export

Update `next.config.ts`:

```typescript
import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'export', // Enable static export
  images: {
    unoptimized: true, // Required for static export
  },
  // ... rest of your config
};

export default nextConfig;
```

### Step 2: Build Static Site

```bash
npm run build
```

This creates an `out` folder with static files.

### Step 3: Upload to Namecheap

1. **Via cPanel File Manager:**
   - Go to `public_html` folder
   - Delete default files (if any)
   - Upload all contents from `out` folder

2. **Via FTP:**
   - Connect to your server
   - Upload all files from `out` folder to `public_html`

### Step 4: Configure Domain

1. In Namecheap, go to **"Domain List"** → Select domain → **"Manage"**
2. Go to **"Advanced DNS"** tab
3. Ensure these records exist:

```
Type: A Record
Host: @
Value: [Your hosting IP - get from Namecheap]
TTL: Automatic

Type: CNAME
Host: www
Value: yourdomain.com
TTL: Automatic
```

---

## 🔧 Alternative: Use Namecheap Domain with Vercel (Easiest)

If Namecheap hosting is complicated, you can:
1. **Host on Vercel** (free, optimized for Next.js)
2. **Point your Namecheap domain** to Vercel

This is the **recommended approach** because:
- ✅ Free hosting
- ✅ Automatic SSL
- ✅ Optimized for Next.js
- ✅ Easy deployment
- ✅ Fast global CDN

**Steps:**
1. Deploy to Vercel (see DEPLOYMENT_GUIDE.md)
2. In Vercel, add your Namecheap domain
3. In Namecheap DNS, point to Vercel:
   ```
   Type: CNAME
   Host: @
   Value: cname.vercel-dns.com
   ```

---

## 📋 Pre-Deployment Checklist

- [ ] Check your Namecheap hosting type
- [ ] Verify Node.js support (if using Option A)
- [ ] Build project: `npm run build`
- [ ] Test locally: `npm start`
- [ ] Set environment variables
- [ ] Upload files to server
- [ ] Configure domain DNS
- [ ] Test website is live

---

## 🛠️ Troubleshooting

### "Node.js not found" error?
- Check if Node.js is installed in cPanel
- Contact Namecheap support to enable Node.js

### "Port already in use"?
- Change PORT in environment variables
- Check if another app is using port 3000

### Site shows "404"?
- Check file paths
- Ensure `public_html` is the correct folder
- Verify domain DNS is pointing correctly

### Build fails?
- Check Node.js version (need 18+)
- Ensure all dependencies are installed
- Check build logs for errors

---

## 📞 Namecheap Support

If you need help:
- **Live Chat:** Available in Namecheap dashboard
- **Support Ticket:** Submit via Namecheap account
- **Knowledge Base:** [namecheap.com/support](https://www.namecheap.com/support/)

---

## 💡 Recommendation

**For Next.js apps, we recommend:**
1. **Host on Vercel** (free, optimized)
2. **Use Namecheap domain** (point DNS to Vercel)

This gives you:
- Best performance
- Easiest deployment
- Automatic updates
- Free SSL certificate
- Global CDN

Your Namecheap domain will work perfectly, just pointing to Vercel's servers!
