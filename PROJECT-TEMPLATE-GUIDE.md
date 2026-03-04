# Project Template Usage Guide

## Overview

`project-template.html` is a reusable template for creating individual project detail pages. Each project gets its own dedicated page following the same structure and design system.

## How to Use This Template

### Step 1: Duplicate the Template

```bash
# Copy the template and rename it
copy project-template.html project-[client-name].html

# Example:
copy project-template.html project-saas-crm.html
```

### Step 2: Replace Placeholder Content

Search and replace the following placeholders:

#### Meta Tags (Lines 1-30)
- `[PROJECT NAME]` - Full project title
- `[Brief description of project and results]` - SEO meta description
- `[project specific keywords]` - Relevant keywords
- `[project-slug]` - URL-friendly slug (e.g., "saas-crm-implementation")
- `[project-image]` - Image filename (e.g., "project-saas-crm.jpg")

#### Project Header (Lines 260-265)
- `[CATEGORY NAME]` - Project category (e.g., "B2B SAAS PLATFORM")
- `[Project Title Goes Here]` - Main project headline

#### Content Sections
Replace all bracketed `[placeholder text]` with actual project content:

1. **Infrastructure Challenge** (Section 1)
   - Describe operational gaps
   - Include quantitative context

2. **System Architecture Deployed** (Section 2)
   - Frontend architecture details
   - Backend infrastructure specs
   - CRM integration approach
   - Automation logic explanation
   - Deployment environment

3. **Engineering Stack** (Section 3)
   - Frontend technologies
   - Backend technologies
   - Infrastructure tools

4. **Operational Impact** (Section 4)
   - Measurable results
   - Metrics with numbers highlighted

5. **Media** (Section 5)
   - Replace `assets/project-placeholder.jpg` with actual screenshot
   - Uncomment video section if needed
   - Add alt text descriptions

## File Naming Convention

Use this pattern:
```
project-[client-type]-[solution].html

Examples:
- project-saas-crm.html
- project-ecommerce-automation.html
- project-agency-dashboard.html
```

## Required Assets

For each project, prepare:

1. **Project Images**
   - Main screenshot: `assets/project-[name]-1.jpg`
   - Additional screenshots: `assets/project-[name]-2.jpg`
   - Recommended size: 1200x800px minimum
   - Format: JPG or PNG

2. **OG Image** (for social sharing)
   - `assets/og-project-[name].jpg`
   - Size: 1200x630px
   - Should match project branding

## SEO Checklist

Before publishing, ensure:

- [ ] Unique `<title>` tag (50-60 characters)
- [ ] Unique meta description (150-160 characters)
- [ ] Canonical URL updated
- [ ] All `[placeholder]` text replaced
- [ ] Images have descriptive alt text
- [ ] Keywords naturally integrated

## Example: Completed Project Page

### Filename
`project-hubspot-saas.html`

### Title Tag
```html
<title>HubSpot CRM Implementation for B2B SaaS | Regnum Consulting</title>
```

### Meta Description
```html
<meta name="description" content="47% increase in close rate through custom HubSpot CRM architecture. Automated lead scoring, pipeline visibility, and real-time dashboards for B2B SaaS sales team.">
```

### Category
```html
<div class="project-category">B2B SAAS PLATFORM</div>
```

### Project Title
```html
<h1 class="project-title">HubSpot CRM Architecture Deployment</h1>
```

## Adding to Sitemap

After creating a new project page, add it to `sitemap.xml`:

```xml
<url>
    <loc>https://regnumconsulting.com/project-[slug]</loc>
    <lastmod>2026-02-26</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

## Linking from Case Studies

Update `index.html` case study cards to link to project detail pages:

```html
<div class="case-card fade-in">
    <a href="project-[slug].html" style="color: inherit; text-decoration: none;">
        <!-- Case study content -->
    </a>
</div>
```

## Design System Reference

### Colors
- Background: `#0B0F14`
- Section Background: `#11161D`
- Accent: `#C7E35F`
- Primary Text: `#F2F2F2`
- Muted Text: `#9BA3AF`

### Typography
- Headings: `Sora` (600-700 weight)
- Body: `Inter` (400-500 weight)

### Spacing
- Section padding: `5rem 0` (desktop), `3rem 0` (mobile)
- Content max-width: `900px`

## Quality Standards

Each project page should:
- **Be factual** - No marketing fluff, technical precision
- **Include metrics** - Quantified operational impact
- **Show architecture** - Clear technical breakdown
- **Maintain tone** - Dominant, structured, professional
- **Be complete** - No lorem ipsum or placeholders

## Testing Checklist

Before going live:

- [ ] Desktop layout looks correct
- [ ] Mobile layout stacks properly
- [ ] All images load correctly
- [ ] Navigation links work
- [ ] CTA button links correctly
- [ ] No console errors
- [ ] Page loads in < 3 seconds
- [ ] Meta tags render correctly

---

**Template Version**: 1.0  
**Last Updated**: February 26, 2026  
**Maintained By**: Regnum Consulting
