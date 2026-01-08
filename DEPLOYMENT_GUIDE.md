# Deployment Guide - Deploying to Namecheap Domain

This guide will help you deploy your Next.js website and connect it to your Namecheap domain.

## 🚀 Recommended: Deploy to Vercel (Easiest for Next.js)

Vercel is made by the creators of Next.js and offers the best Next.js hosting experience.

### Step 1: Prepare Your Project

1. **Ensure your code is on GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create a `.env.local` file** (for local testing, don't commit this):
   ```env
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

### Step 2: Deploy to Vercel

1. **Sign up for Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import your project:**
   - Click "Add New Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables:**
   - In project settings, go to "Environment Variables"
   - Add: `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   - Add any other environment variables you need

4. **Deploy:**
   - Click "Deploy"
   - Wait for build to complete (usually 2-3 minutes)
   - You'll get a URL like: `your-project.vercel.app`

### Step 3: Connect Namecheap Domain

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Click "Add Domain"
   - Enter your domain: `braxleynevim.com` (or `www.braxleynevim.com`)

2. **In Namecheap Dashboard:**
   - Log in to [namecheap.com](https://namecheap.com)
   - Go to "Domain List" → Select your domain → "Manage"
   - Go to "Advanced DNS" tab
   - Add/Update these DNS records:

   **For Root Domain (braxleynevim.com):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```

   **For WWW (www.braxleynevim.com):**
   ```
   Type: CNAME Record
   Host: www
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

   **Alternative (if A record doesn't work):**
   ```
   Type: CNAME Record
   Host: @
   Value: cname.vercel-dns.com
   TTL: Automatic
   ```

3. **Wait for DNS Propagation:**
   - DNS changes can take 24-48 hours to propagate
   - Check status in Vercel dashboard
   - Use [whatsmydns.net](https://www.whatsmydns.net) to check propagation

### Step 4: Update Your Code

Update your environment variables in Vercel to use your actual domain:

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_SITE_URL` to your actual domain
3. Redeploy the project

---

## 🌐 Alternative: Deploy to Other Platforms

### Option A: Netlify

1. **Sign up:** [netlify.com](https://netlify.com)
2. **Connect GitHub:** Import your repository
3. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
4. **Environment variables:** Add `NEXT_PUBLIC_SITE_URL`
5. **Custom domain:** Add your Namecheap domain in Netlify settings
6. **DNS:** Update Namecheap DNS to point to Netlify

### Option B: Namecheap Hosting (If Available)

**Note:** Namecheap shared hosting typically doesn't support Node.js. You'll need:
- **Namecheap VPS** (Virtual Private Server) or
- **Namecheap Shared Hosting with Node.js support** (check availability)

If you have Node.js hosting:

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Upload files via FTP/SFTP:**
   - Upload the entire project folder
   - Install dependencies: `npm install --production`
   - Start server: `npm start`

3. **Configure domain:** Point your domain to the hosting IP

---

## 📋 Pre-Deployment Checklist

- [ ] All code is committed to GitHub
- [ ] Environment variables are set
- [ ] `NEXT_PUBLIC_SITE_URL` is set to your domain
- [ ] Build runs successfully: `npm run build`
- [ ] Test production build locally: `npm run build && npm start`
- [ ] All images are optimized
- [ ] SEO metadata is complete
- [ ] Sitemap is generated
- [ ] Robots.txt is configured

---

## 🔧 Environment Variables to Set

In your hosting platform (Vercel/Netlify/etc.), set these:

```
NEXT_PUBLIC_SITE_URL=https://braxleynevim.com
```

(Add any other environment variables your app needs)

---

## 🎯 Quick Deploy Commands

```bash
# 1. Build for production
npm run build

# 2. Test production build locally
npm start

# 3. If everything works, push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

---

## 📞 Namecheap DNS Configuration

### For Vercel:

**Option 1: A Record (Root Domain)**
```
Type: A
Host: @
Value: 76.76.21.21
TTL: Automatic
```

**Option 2: CNAME (Recommended)**
```
Type: CNAME
Host: @
Value: cname.vercel-dns.com
TTL: Automatic
```

**For WWW:**
```
Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### For Netlify:

```
Type: A
Host: @
Value: [Netlify IP - check Netlify docs]
TTL: Automatic

Type: CNAME
Host: www
Value: [your-site].netlify.app
TTL: Automatic
```

---

## ✅ Post-Deployment Steps

1. **Verify SSL Certificate:** Should be automatic with Vercel/Netlify
2. **Test all pages:** Home, Projects, Blog, Contact
3. **Check mobile responsiveness**
4. **Test form submissions**
5. **Verify SEO:** Check sitemap.xml and robots.txt
6. **Set up Google Search Console:** Submit your sitemap
7. **Monitor performance:** Use Vercel Analytics or similar

---

## 🆘 Troubleshooting

### DNS Not Working?
- Wait 24-48 hours for propagation
- Clear DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)

### Build Fails?
- Check build logs in Vercel/Netlify dashboard
- Ensure all dependencies are in `package.json`
- Check for TypeScript errors: `npm run lint`

### Images Not Loading?
- Verify image paths are correct
- Check Next.js image configuration
- Ensure images are in `public` folder

---

## 📚 Additional Resources

- [Vercel Deployment Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Namecheap DNS Setup](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-can-i-set-up-an-a-address-record-for-my-domain/)

---

**Recommended:** Use Vercel for the easiest Next.js deployment experience, then connect your Namecheap domain via DNS settings.
