# Vercel Deployment Guide

Complete guide to deploy your Next.js project to Vercel.

## 🚀 Quick Start (5 Minutes)

### Step 1: Prepare Your Repository

1. **Ensure your code is on GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Verify your build works locally:**
   ```bash
   npm run build
   ```
   Make sure the build completes without errors.

### Step 2: Deploy to Vercel

1. **Sign up/Login to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account (recommended)

2. **Import Your Project:**
   - Click **"Add New..."** → **"Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project Settings:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

4. **Set Environment Variables:**
   - Click **"Environment Variables"**
   - Add the following:
     ```
     NEXT_PUBLIC_SITE_URL=https://yourdomain.com
     ```
   - Replace `yourdomain.com` with your actual domain

5. **Deploy:**
   - Click **"Deploy"**
   - Wait for the build to complete (usually 2-3 minutes)
   - Your site will be live at `https://your-project.vercel.app`

---

## 🌐 Connect Your Custom Domain

### Step 1: Add Domain in Vercel

1. Go to your project in Vercel dashboard
2. Click **"Settings"** → **"Domains"**
3. Click **"Add Domain"**
4. Enter your domain (e.g., `braxleynevim.com`)
5. Vercel will show you DNS configuration

### Step 2: Update DNS at Namecheap

1. **Log in to Namecheap:**
   - Go to [namecheap.com](https://namecheap.com)
   - Navigate to **"Domain List"** → Select your domain

2. **Go to Advanced DNS:**
   - Click **"Advanced DNS"** tab

3. **Add DNS Records:**
   
   **For Root Domain (@):**
   ```
   Type: A Record
   Host: @
   Value: 76.76.21.21
   TTL: Automatic
   ```
   
   **For WWW Subdomain:**
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

4. **Save Changes:**
   - Click **"Save All Changes"**
   - DNS propagation can take 24-48 hours (usually much faster)

### Step 3: Verify Domain in Vercel

1. Go back to Vercel → Your Project → Settings → Domains
2. Wait for DNS to propagate (check status in Vercel dashboard)
3. Vercel will automatically issue an SSL certificate (HTTPS)

---

## 🔧 Environment Variables

### Required Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your site's full URL | `https://braxleynevim.com` |

### How to Add Environment Variables

1. Go to **Project Settings** → **Environment Variables**
2. Click **"Add New"**
3. Enter variable name and value
4. Select environments (Production, Preview, Development)
5. Click **"Save"**
6. **Redeploy** your project for changes to take effect

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure:

- [ ] Code is committed to GitHub
- [ ] `npm run build` succeeds locally
- [ ] All dependencies are in `package.json`
- [ ] Environment variables are documented
- [ ] `NEXT_PUBLIC_SITE_URL` is set correctly
- [ ] No hardcoded localhost URLs
- [ ] Images are optimized
- [ ] SEO metadata is complete
- [ ] Mobile responsive design tested
- [ ] All pages are accessible

---

## 🎯 Deployment Options

### Option 1: Automatic Deployments (Recommended)

**Connect GitHub repository:**
- Every push to `main` branch = automatic production deployment
- Every pull request = preview deployment
- Zero configuration needed

### Option 2: Manual Deploy

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. For production:
   ```bash
   vercel --prod
   ```

---

## 🔍 Troubleshooting

### Build Fails

**Error: "Module not found"**
- Check all imports are correct
- Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: "Type errors"**
- Fix TypeScript errors: `npm run build`
- Check `tsconfig.json` configuration

**Error: "Out of memory"**
- Vercel free tier has memory limits
- Optimize your build (remove unused dependencies)
- Consider upgrading to Pro plan

### Site Shows 404

**Check:**
- Routes are correctly defined in `app/` directory
- `next.config.ts` doesn't have conflicting settings
- Build completed successfully

### Images Not Loading

**Check:**
- Image domains are configured in `next.config.ts`
- Images are in `public/` directory
- Image paths use `/img/...` (not `./img/...`)

### Environment Variables Not Working

**Check:**
- Variables are prefixed with `NEXT_PUBLIC_` for client-side
- Variables are set in Vercel dashboard
- Project has been redeployed after adding variables

### DNS Not Working

**Check:**
- DNS records are correctly configured
- Wait 24-48 hours for propagation
- Use [whatsmydns.net](https://www.whatsmydns.net) to check
- Verify domain is added in Vercel dashboard

---

## 🚀 Vercel Features You Get

### Automatic Optimizations

- ✅ **Image Optimization:** Automatic WebP/AVIF conversion
- ✅ **Code Splitting:** Automatic route-based code splitting
- ✅ **Edge Network:** Global CDN for fast loading
- ✅ **HTTPS:** Automatic SSL certificates
- ✅ **Analytics:** Built-in performance analytics

### Preview Deployments

- Every pull request gets a preview URL
- Test changes before merging
- Share preview links with team

### Automatic Scaling

- Handles traffic spikes automatically
- No server management needed
- Global edge network

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Go to **Project Settings** → **Analytics**
2. Enable **Web Analytics** (free tier available)
3. View real-time visitor data
4. Track Core Web Vitals

### Performance Monitoring

- View build logs in Vercel dashboard
- Check deployment status
- Monitor function execution times

---

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected to GitHub:
- **Production:** Deploys on push to `main` branch
- **Preview:** Deploys on every pull request
- **Rollback:** One-click rollback to previous deployment

### Branch Protection

1. Go to **Project Settings** → **Git**
2. Configure branch protection rules
3. Require preview deployments before production

---

## 🎨 Custom Build Settings

If you need custom build settings, they're already configured in `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

---

## 📞 Support & Resources

### Vercel Documentation
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Domain Configuration](https://vercel.com/docs/concepts/projects/domains)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [GitHub Discussions](https://github.com/vercel/vercel/discussions)

---

## ✅ Post-Deployment Checklist

After deployment:

- [ ] Site loads correctly at Vercel URL
- [ ] Custom domain works (if configured)
- [ ] HTTPS is active (SSL certificate)
- [ ] All pages are accessible
- [ ] Images load correctly
- [ ] Forms work (if applicable)
- [ ] Mobile version works
- [ ] SEO metadata is correct
- [ ] Analytics is tracking (if enabled)
- [ ] Performance is good (check Core Web Vitals)

---

## 🎯 Next Steps

1. **Set up Analytics:** Enable Vercel Analytics
2. **Configure Domain:** Add your custom domain
3. **Set Environment Variables:** Add production variables
4. **Test Everything:** Verify all features work
5. **Monitor Performance:** Check analytics dashboard

---

## 💡 Pro Tips

1. **Use Preview Deployments:** Test changes before production
2. **Monitor Build Times:** Optimize if builds take too long
3. **Set Up Alerts:** Get notified of deployment failures
4. **Use Edge Functions:** For serverless API routes
5. **Enable Analytics:** Track your site's performance

---

**Your site is now ready for Vercel! 🚀**

For the easiest deployment experience, just connect your GitHub repository and let Vercel handle the rest.
