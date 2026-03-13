'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// ========== ENVIRONMENT CONFIGURATION ==========
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const PORT = parseInt(process.env.PORT, 10) || 3000;
const ROOT_DIR = __dirname;

// ========== SECURITY CONSTANTS ==========
const MAX_REQUEST_SIZE = 1024 * 1024; // 1MB
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 100;

// Allowed file extensions (whitelist approach)
const ALLOWED_EXTENSIONS = new Set([
  '.html', '.css', '.js', '.json', '.png', '.jpg', '.jpeg',
  '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf', '.eot',
  '.txt', '.xml', '.webp'
]);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp'
};

// ========== RATE LIMITING ==========
const requestCounts = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    requestCounts.set(ip, { count: 1, windowStart: now });
    return false;
  }
  
  record.count++;
  if (record.count > MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  return false;
}

// Cleanup old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of requestCounts.entries()) {
    if (now - record.windowStart > RATE_LIMIT_WINDOW * 2) {
      requestCounts.delete(ip);
    }
  }
}, RATE_LIMIT_WINDOW);

// ========== SECURITY HEADERS ==========
function setSecurityHeaders(res) {
  // Content Security Policy - strict
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '));
  
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'DENY');
  
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // XSS Protection (legacy browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Referrer Policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions Policy (restrict browser features)
  res.setHeader('Permissions-Policy', [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()'
  ].join(', '));
  
  // HSTS (only in production with HTTPS)
  if (IS_PRODUCTION) {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }
  
  // Cache control for dynamic content
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
}

// ========== PATH VALIDATION (PREVENT TRAVERSAL) ==========
function sanitizePath(requestUrl) {
  // Decode URL and parse
  let decodedUrl;
  try {
    decodedUrl = decodeURIComponent(requestUrl.split('?')[0]);
  } catch (e) {
    return null; // Invalid encoding
  }
  
  // Remove null bytes (poison null byte attack)
  if (decodedUrl.includes('\0')) {
    return null;
  }
  
  // Normalize path separators
  decodedUrl = decodedUrl.replace(/\\/g, '/');
  
  // Block path traversal attempts
  if (decodedUrl.includes('..') || decodedUrl.includes('//')) {
    return null;
  }
  
  // Resolve to absolute path within ROOT_DIR
  const resolved = path.resolve(ROOT_DIR, '.' + decodedUrl);
  
  // Ensure resolved path is within ROOT_DIR
  if (!resolved.startsWith(ROOT_DIR + path.sep) && resolved !== ROOT_DIR) {
    return null;
  }
  
  return resolved;
}

// ========== INPUT VALIDATION ==========
function validateRequest(req) {
  // Check HTTP method (only GET and HEAD allowed for static server)
  if (!['GET', 'HEAD'].includes(req.method)) {
    return { valid: false, status: 405, message: 'Method Not Allowed' };
  }
  
  // Check URL length (prevent buffer overflow attacks)
  if (req.url.length > 2048) {
    return { valid: false, status: 414, message: 'URI Too Long' };
  }
  
  // Check for suspicious characters in URL
  const suspiciousPattern = /[<>'"`;|&$]/;
  if (suspiciousPattern.test(req.url)) {
    return { valid: false, status: 400, message: 'Bad Request' };
  }
  
  return { valid: true };
}

// ========== ERROR RESPONSES ==========
function sendError(res, status, message) {
  const safeMessage = IS_PRODUCTION ? 'Error' : message;
  res.writeHead(status, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`<!DOCTYPE html><html><head><title>${status}</title></head><body><h1>${status} - ${safeMessage}</h1></body></html>`);
}

// ========== LOGGING (SECURE) ==========
function secureLog(level, message, meta = {}) {
  if (IS_PRODUCTION && level === 'debug') return;
  
  // Never log sensitive data
  const safeMeta = { ...meta };
  delete safeMeta.ip;
  delete safeMeta.cookies;
  delete safeMeta.authorization;
  
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, level, message, ...safeMeta };
  
  if (!IS_PRODUCTION) {
    console.log(JSON.stringify(logEntry));
  }
}

// ========== MAIN SERVER ==========
const server = http.createServer((req, res) => {
  // Get client IP (trust X-Forwarded-For only behind reverse proxy)
  const clientIP = req.socket.remoteAddress || 'unknown';
  
  // Apply rate limiting
  if (isRateLimited(clientIP)) {
    secureLog('warn', 'Rate limit exceeded', { url: req.url });
    sendError(res, 429, 'Too Many Requests');
    return;
  }
  
  // Set security headers
  setSecurityHeaders(res);
  
  // Validate request
  const validation = validateRequest(req);
  if (!validation.valid) {
    secureLog('warn', 'Invalid request', { url: req.url, reason: validation.message });
    sendError(res, validation.status, validation.message);
    return;
  }
  
  // Map public folder paths
  let requestUrl = req.url;
  if (requestUrl.startsWith('/images/') || requestUrl.startsWith('/data/')) {
    requestUrl = '/public' + requestUrl;
  }
  
  // Handle root path
  if (requestUrl === '/' || requestUrl === '') {
    requestUrl = '/index.html';
  }
  
  // Clean URLs: if no extension, try appending .html
  const parsedExt = path.extname(requestUrl.split('?')[0]).toLowerCase();
  if (!parsedExt && requestUrl !== '/index.html') {
    requestUrl = requestUrl.split('?')[0] + '.html';
  }
  
  // Sanitize and validate path
  const filePath = sanitizePath(requestUrl);
  if (!filePath) {
    secureLog('warn', 'Path traversal attempt blocked', { url: req.url });
    sendError(res, 400, 'Bad Request');
    return;
  }
  
  // Check file extension whitelist
  const ext = path.extname(filePath).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    secureLog('warn', 'Blocked file type', { ext });
    sendError(res, 403, 'Forbidden');
    return;
  }
  
  // Get MIME type
  const mimeType = MIME_TYPES[ext] || 'application/octet-stream';
  
  // Check if file exists first (async)
  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      // Try serving 404.html for not found pages
      const notFoundPath = path.join(ROOT_DIR, '404.html');
      fs.readFile(notFoundPath, (err404, content404) => {
        if (err404) {
          sendError(res, 404, 'Not Found');
          return;
        }
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content404);
      });
      return;
    }
    
    // Check file size
    if (stats.size > MAX_REQUEST_SIZE) {
      sendError(res, 413, 'Payload Too Large');
      return;
    }
    
    // Set cache headers for static assets
    if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.webp', '.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (['.css', '.js'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
    
    // Read and serve file
    fs.readFile(filePath, (err, content) => {
      if (err) {
        secureLog('error', 'File read error', { path: filePath });
        sendError(res, 500, 'Internal Server Error');
        return;
      }
      
      res.writeHead(200, { 'Content-Type': mimeType });
      res.end(content);
    });
  });
});

// Handle server errors gracefully
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    secureLog('error', `Port ${PORT} is already in use`);
    process.exit(1);
  }
  secureLog('error', 'Server error', { error: err.message });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  secureLog('info', 'SIGTERM received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  secureLog('info', 'SIGINT received, shutting down gracefully');
  server.close(() => {
    process.exit(0);
  });
});

server.listen(PORT, '127.0.0.1', () => {
  if (!IS_PRODUCTION) {
    console.log(`\n✓ Regnum Development Server running`);
    console.log(`  Local: http://localhost:${PORT}`);
    console.log(`  Environment: ${NODE_ENV}`);
    console.log(`  Press Ctrl+C to stop\n`);
  }
});
