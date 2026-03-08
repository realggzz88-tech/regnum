# Security Audit

This project is a static website comprised of HTML, CSS, and JavaScript. All backend code and third-party integrations have been removed, providing a minimal attack surface.

## Overview

- No `api/` directory or serverless functions exist.
- Static files are served directly; no dynamic processing occurs.
- There are no required environment variables.
- User input (where applicable) is validated and rendered using `textContent` to prevent XSS.
- Security headers are enforced via `vercel.json`.

## Recommendations

- Maintain HTTPS across all domains.
- Review any future additions for external API calls or dynamic content.
- Keep dependencies up to date.

**Report generated:** March 8, 2026
