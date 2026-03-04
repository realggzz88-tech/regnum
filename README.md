# Regnum Consulting Website

Production-ready static website for a consulting firm built with pure HTML5, CSS3, and vanilla JavaScript.

## 🎯 Project Structure

```
regnum/
│
├── index.html                    # Main homepage
├── it-consulting-macedonia.html  # Regional landing page
├── project-template.html         # Reusable project detail template
├── style.css                     # Complete design system
├── script.js                     # Smooth scroll and animations
├── sitemap.xml                   # SEO sitemap
├── robots.txt                    # Search engine directives
├── start-dev.bat                 # Local dev server launcher
├── PROJECT-TEMPLATE-GUIDE.md     # Template usage instructions
└── assets/                       # Asset directory
    ├── logo.png                  # Company logo
    ├── favicon.ico               # Browser icon
    ├── og-image.jpg              # Social media preview
    └── PROJECT-IMAGES.md         # Image guidelines
```

## ✨ Features

- **Dark Luxury Design**: Corporate, minimal, and structured aesthetic
- **Fully Responsive**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Subtle fade-in effects on scroll
- **Sticky Navigation**: Professional navbar with smooth scrolling
- **Mobile Menu**: Hamburger menu for mobile devices
- **SEO Optimized**: Semantic HTML5 structure
- **Production Ready**: Clean, commented code ready for deployment

## 🎨 Design System

### Colors
- Background: `#0B0F14`
- Section Background: `#11161D`
- Accent: `#C7E35F`
- Primary Text: `#F2F2F2`
- Muted Text: `#9BA3AF`

### Typography
- **Headings**: Sora (600-700 weight)
- **Body**: Inter (400-500 weight)
- Loaded via Google Fonts

## 📄 Sections Included

1. **Navbar** - Sticky navigation with smooth scroll
2. **Hero** - Full-height section with main CTA
3. **Transformation Strategy** - Positioning statement
4. **Problem Section** - Three-column layout highlighting pain points
5. **Model Section** - The Regnum Infrastructure Model™ (5 steps)
6. **System Implementations** - Technical project case studies
7. **Services** - Three core service offerings
8. **About** - Professional positioning statement
9. **Final CTA** - Centered call-to-action
10. **Footer** - Minimal footer with copyright

## 📦 Project Template System

### Creating Individual Project Pages

Use `project-template.html` to create detailed project case studies:

1. **Duplicate the template**:
   ```bash
   copy project-template.html project-[client-name].html
   ```

2. **Replace placeholders**:
   - `[PROJECT NAME]` - SEO title and meta tags
   - `[CATEGORY NAME]` - Project category
   - Content sections with actual project details

3. **Add project images** to `assets/` folder

4. **Full instructions**: See [PROJECT-TEMPLATE-GUIDE.md](PROJECT-TEMPLATE-GUIDE.md)

### Template Sections

Each project page includes:
- Infrastructure Challenge
- System Architecture Deployed (Frontend, Backend, CRM, Automation, Deployment)
- Engineering Stack
- Operational Impact (metrics)
- Project Media (images/video)
- CTA section

## 🚀 Local Development

### Quick Start (Recommended)

Simply double-click `start-dev.bat` or run in terminal:
```powershell
.\start-dev.bat
```

This will:
- Start a local server on `http://localhost:3000`
- Automatically open your browser
- Same host/port every time

**To stop the server**: Press `Ctrl+C` in the terminal

### Alternative Methods

**Option 1: NPX (manual)**
```powershell
npx http-server -p 3000 -o
```

**Option 2: VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

**Option 3: Direct file open**
- Simply open `index.html` in your browser
- Works fine, but uses `file://` protocol instead of `http://`

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy from project directory:
   ```bash
   vercel
   ```

### Option 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository or drag and drop the folder
4. Vercel will automatically detect it as a static site
5. Click "Deploy"

## � SEO Optimization

This website includes comprehensive SEO optimization:

### Meta Tags
- **Optimized Title**: 60 characters, keyword-rich
- **Meta Description**: 155 characters, compelling and informative
- **Meta Keywords**: Targeting key consulting terms
- **Robots**: Set to `index, follow` for search engine crawling
- **Canonical URL**: Prevents duplicate content issues

### Social Media
- **Open Graph Tags**: Optimized for Facebook, LinkedIn sharing
- **Twitter Card**: Large image cards for Twitter shares
- **OG Image**: 1200x630px social preview (needs to be created)

### Structured Data
- **JSON-LD Schema**: ProfessionalService type
- **Rich Snippets Ready**: Enhanced search results
- **International Service Area**: Global reach defined

### On-Page SEO
- **Single H1**: Only one per page (hero headline)
- **Proper Heading Hierarchy**: H2 for sections, H3 for cards
- **Semantic HTML5**: Proper structure tags
- **Internal Linking**: Smooth scroll anchor navigation

### Technical SEO
- **robots.txt**: Allows all search engines
- **sitemap.xml**: XML sitemap with all sections
- **Font Display Swap**: Prevents invisible text flash
- **Preconnect**: Faster Google Fonts loading

### Target Keywords
- Business consulting firm
- CRM consulting
- Sales system consulting
- Automation consulting
- Business infrastructure consulting
- Operational consulting

## 📝 Customization Notes

### Required Assets
See `assets/README.md` for details on:
- **favicon.ico**: Browser tab icon (32x32px)
- **og-image.jpg**: Social media preview (1200x630px)
- **logo.png**: Optional company logo

### Logo
- Add your logo image to `assets/logo.png`
- Update the navbar in `index.html` to use the image:
  ```html
  <div class="logo">
      <img src="assets/logo.png" alt="Regnum Consulting">
  </div>
  ```
- Add logo styles in `style.css`

### Domain Configuration
- Update canonical URL in `index.html` (currently `https://regnumconsulting.com`)
- Update sitemap.xml URLs
- Update robots.txt sitemap location
- Update Open Graph URLs

### Contact Email
- Update the email in the "Book Consultation" button (currently `hello@regnumconsulting.com`)

### Content
- All text is production-ready but can be customized
- No placeholder lorem ipsum - real consulting firm copy

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1024px
- **Mobile**: Below 768px
- **Small Mobile**: Below 480px

## ⚡ Performance

- No external frameworks or libraries
- Minimal JavaScript (< 2KB)
- Fast loading times
- Optimized for static hosting

## 🛠 Technologies

- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts (Sora, Inter)

---

**Built for enterprise-level consulting firms.**
