'use strict';

/**
 * Vercel Edge Middleware for Security Headers
 * This middleware runs on every request before hitting the API or static files
 * 
 * Note: For static sites without Next.js, security headers are primarily
 * configured in vercel.json. This file serves as a template for future
 * enhancement if the project migrates to Next.js or similar framework.
 */

export const config = {
  matcher: [
    // Match API routes
    '/api/:path*',
  ],
};

/**
 * Security middleware for API routes
 * Adds security headers and basic request validation
 */
export default async function middleware(request) {
  const url = new URL(request.url);
  
  // Block requests with suspicious patterns
  const suspiciousPatterns = [
    /\.\./,           // Path traversal
    /<script/i,       // XSS attempt
    /javascript:/i,   // JavaScript protocol
    /data:/i,         // Data protocol (potential XSS)
    /vbscript:/i,     // VBScript
  ];
  
  const fullUrl = url.pathname + url.search;
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(fullUrl)) {
      return new Response(JSON.stringify({ error: 'Bad Request' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    }
  }
  
  // Check request method for API routes
  if (url.pathname.startsWith('/api/')) {
    const allowedMethods = ['GET', 'POST', 'OPTIONS'];
    if (!allowedMethods.includes(request.method)) {
      return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Allow': allowedMethods.join(', '),
        },
      });
    }
  }
  
  // Continue with the request
  return undefined; // Pass to next handler
}
