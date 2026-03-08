# Vercel Deployment Guide - Regnum Consulting

## ✅ Pre-Deployment Checklist

This document outlines all the steps needed to deploy this website on Vercel successfully.

---

## 1. Configuration Files Status

### ✅ vercel.json - CONFIGURED
- Clean URLs enabled (`/analiza` → `/analiza.html`)
- Security headers added
- Cache headers optimized
- All route redirects configured

### ✅ package.json - CONFIGURED  
- Static site setup (no build step required)
- Minimal necessary configuration

---

## 2. Environment Variables Required

Before deploying, configure these in Vercel Dashboard:

### Environment Variables

This project currently has no required environment variables. (Previous Telegram integration removed.)

---

## 3. File Structure Verified

### Core Files:
- ✅ index.html - Homepage
- ✅ analiza.html
- ✅ dizajn.html
- ✅ izgradba.html
- ✅ websites.html
- ✅ crm-systems.html
- ✅ automation.html
- ✅ growth.html
- ✅ ai-integracija.html
- ✅ lead-generation.html
- ✅ it-consulting-macedonia.html
- ✅ 404.html - Custom error page
- ✅ 500.html - Error page

### Styling & Scripts:
- ✅ style.css - Main stylesheet
- ✅ services.css - Service pages stylesheet
- ✅ script.js - Core functionality
- ✅ assets/js/project-sliders.js - Project slider component

### Assets:
- ✅ assets/favicon.svg
- ✅ assets/favicon.ico
- ✅ assets/og-image.jpg (placeholder - replace with real image)
- ✅ assets/project-placeholder.jpg (placeholder - replace with real images)
- ✅ assets/project-placeholder-2.jpg (placeholder - replace with real images)
- ✅ public/images/projects/ - All project images

### API:

### SEO/Meta:
- ✅ sitemap.xml
- ✅ robots.txt
- ✅ Robots.txt configured

---

## 4. Known Placeholder Files

Replace these with production assets:

```
assets/og-image.jpg                 → Add real OG image (1200x630px recommended)
assets/project-placeholder.jpg      → Add real project screenshot
assets/project-placeholder-2.jpg    → Add real project screenshot  
logo1.png                           → Add actual logo (if using)
```

**Note:** These are created as placeholders to prevent 404 errors. Vercel deployment will work without them, but the page experience won't be optimal.

---

## 5. Deployment Steps

### Option A: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from project directory
vercel --prod
```

### Option B: Deploy via GitHub/GitLab

1. Push to your Git repository
2. Connect repo in Vercel Dashboard
3. Vercel auto-deploys on push

### Option C: Deploy via Vercel Dashboard UI

1. Go to https://vercel.com
2. Click "Add New Project"
3. Import this repository
4. Click "Deploy"

---

## 6. Post-Deployment Verification

After deployment, verify these work:

### ✅ Check Main Pages Load
- [ ] https://your-domain.com (index.html)
- [ ] https://your-domain.com/websites (websites.html)
- [ ] https://your-domain.com/crm-systems (crm-systems.html)
- [ ] https://your-domain.com/automation (automation.html)

### ✅ Check API Route

### ✅ Check 404 Handling
- [ ] https://your-domain.com/nonexistent → Shows custom 404 page

### ✅ Check Security Headers
Use online header checker or:
```bash
curl -i https://your-domain.com
```
Look for:
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin

---

## 7. Troubleshooting

### Issue: 404 on pages like `/websites`
**Solution:** Clean URLs are enabled in vercel.json. This is working as configured.

### Issue: Images not loading
**Solution:** Check image paths in HTML:
- Root-relative: `/images/projects/image.png` ✅
- Relative: `./public/images/projects/image.png` ❌
- Currently using: Root-relative paths ✅

### Issue: API endpoint returning 500
**Solution:** Verify environment variables are set:
1. Go to Vercel Dashboard
2. Project Settings → Environment Variables

### Issue: CSS/JS not loading
**Solution:** Files should load via:
- `https://your-domain.com/style.css` ✅
- `https://your-domain.com/script.js` ✅
These are configured correctly.

---

## 8. Performance Optimizations Applied

- ✅ Clean URLs enabled (better SEO)
- ✅ Caching headers configured for assets (1 year)
- ✅ Security headers added
- ✅ Gzip compression (automatic via Vercel)
- ✅ CDN distribution (automatic via Vercel)

---

## 9. SEO Configuration

- ✅ Canonical URLs set in all HTML files
- ✅ Meta tags configured
- ✅ OpenGraph tags for social sharing
- ✅ Twitter Card tags
- ✅ JSON-LD structured data
- ✅ sitemap.xml created
- ✅ robots.txt configured

---

## 10. Security Applied

- ✅ CORS headers configured
- ✅ XSS protection headers
- ✅ Frame-busting headers
- ✅ Content-Type enforcement
- ✅ Rate limiting on API (5 requests/min per IP)
- ✅ Input sanitization

---

## 11. Common Deployment Errors & Fixes

### Error: "No build script found"
**Status:** ✅ FIXED - This is a static site, no build needed

### Error: "Build command failed"
**Status:** ✅ FIXED - `buildCommand` is empty (as intended)

### Error: "404 on all pages"
**Status:** ✅ FIXED - Routes configured in vercel.json

---

## Next Steps

1. Set up environment variables in Vercel
2. Deploy using your preferred method
3. Run post-deployment verification checklist
4. Replace placeholder images with production assets
5. Monitor deployment in Vercel Dashboard

---

**Last Updated:** March 8, 2026
**Status:** ✅ Ready for Deployment
