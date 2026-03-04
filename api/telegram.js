'use strict';

// ========== SECURITY UTILITIES ==========

/**
 * Simple input sanitizer - removes potential XSS/injection characters
 * @param {string} input - Raw user input
 * @returns {string} Sanitized string
 */
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .slice(0, 500) // Max length limit
    .replace(/[<>&"'`\\]/g, '') // Remove dangerous characters
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
}

/**
 * Validate email format
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone format (basic international format)
 * @param {string} phone 
 * @returns {boolean}
 */
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-+()]{6,20}$/;
  return phoneRegex.test(phone);
}

/**
 * Validate contact (email or phone)
 * @param {string} contact 
 * @returns {boolean}
 */
function isValidContact(contact) {
  return isValidEmail(contact) || isValidPhone(contact);
}

// ========== RATE LIMITING ==========
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute per IP

function isRateLimited(ip) {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return false;
  }
  
  record.count++;
  return record.count > MAX_REQUESTS;
}

// ========== ALLOWED VALUES ==========
const ALLOWED_BUSINESS_TYPES = new Set([
  'Нов бизнис', 'Постоечка компанија', 'Е-трговија', 'Информативна страница',
  'Launch a Website', 'CRM & Automation', 'Pricing Information', 'Book Consultation',
  'Unspecified'
]);

const ALLOWED_TIMELINES = new Set([
  'Итно (48–72ч)', 'Во рок од 2 недели', 'Флексибилно', 'Unspecified'
]);

// ========== MAIN HANDLER ==========
export default async function handler(req, res) {
  // Security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Content-Type', 'application/json');
  
  // CORS - restrict to same origin only
  const origin = req.headers.origin;
  const allowedOrigins = [
    'https://regnumconsulting.com',
    'https://www.regnumconsulting.com',
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null
  ].filter(Boolean);
  
  if (process.env.NODE_ENV !== 'production') {
    allowedOrigins.push('http://localhost:3000', 'http://127.0.0.1:3000');
  }
  
  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  // Rate limiting
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.headers['x-real-ip'] || 
                   req.socket?.remoteAddress || 
                   'unknown';
  
  if (isRateLimited(clientIP)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }
  
  // Validate environment
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    // Don't reveal which config is missing in production
    console.error('Telegram configuration error');
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }
  
  // Validate token format (basic check)
  if (!/^\d+:[A-Za-z0-9_-]+$/.test(token)) {
    console.error('Invalid Telegram token format');
    return res.status(500).json({ error: 'Service configuration error' });
  }

  // Parse and validate body
  let body;
  try {
    body = req.body || {};
  } catch (e) {
    return res.status(400).json({ error: 'Invalid request body' });
  }
  
  // Validate required fields
  const { businessType, timeline, contact } = body;
  
  // Validate and sanitize contact (required field)
  const sanitizedContact = sanitizeInput(contact);
  if (!sanitizedContact || !isValidContact(sanitizedContact)) {
    return res.status(400).json({ error: 'Valid email or phone number required' });
  }
  
  // Validate and sanitize business type
  let sanitizedBusinessType = sanitizeInput(businessType) || 'Unspecified';
  if (!ALLOWED_BUSINESS_TYPES.has(sanitizedBusinessType)) {
    sanitizedBusinessType = 'Other: ' + sanitizedBusinessType.slice(0, 50);
  }
  
  // Validate and sanitize timeline
  let sanitizedTimeline = sanitizeInput(timeline) || 'Unspecified';
  if (!ALLOWED_TIMELINES.has(sanitizedTimeline)) {
    sanitizedTimeline = 'Other: ' + sanitizedTimeline.slice(0, 50);
  }
  
  // Build message with escaped content
  const timestamp = new Date().toISOString();
  const message = [
    '🚀 New Website Lead',
    '',
    `📋 Business Type: ${sanitizedBusinessType}`,
    `⏱️ Timeline: ${sanitizedTimeline}`,
    `📞 Contact: ${sanitizedContact}`,
    '',
    `🌐 Source: Website Chat`,
    `🕐 Time: ${timestamp}`
  ].join('\n');

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout
    
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`Telegram API error: ${response.status}`);
      return res.status(500).json({ error: 'Message delivery failed' });
    }
    
    // Don't expose Telegram API response details
    return res.status(200).json({ 
      success: true, 
      message: 'Thank you! We will contact you within 24 hours.' 
    });
    
  } catch (error) {
    // Log error securely (no sensitive data)
    console.error('Telegram request failed:', error.name);
    return res.status(500).json({ error: 'Service temporarily unavailable' });
  }
}
