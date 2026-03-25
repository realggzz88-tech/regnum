'use strict';

const nodemailer = require('nodemailer');

const RECEIVER = 'regnum.mk@gmail.com';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        // Accept all possible fields from frontend
        const {
            name = '',
            phone = '',
            email = '',
            answers = '',
            problem = '',
            intent = '',
            selectedService = '',
            businessType = '',
            timeline = '',
            contact = ''
        } = req.body || {};

        // Debug: log incoming request body
        console.log('--- [DEBUG] Incoming chat lead body:', JSON.stringify(req.body, null, 2));

        // Prefer explicit fields, fallback to old ones for compatibility
        const safe = (v, max = 200) => String(v || '').trim().slice(0, max) || '—';

        // Compose a clean, structured email
            const formattedAnswers = Array.isArray(answers)
                ? answers.map(safe).join('; ')
                : (typeof answers === 'string' ? safe(answers, 1000) : '—');

            const lines = [
                '=== New Lead from Regnum Website ===',
                '',
                `Name: ${safe(name)}`,
                `Phone: ${safe(phone)}`,
                `Email: ${safe(email)}`,
                `Contact: ${safe(contact)}`,
                `Selected Service: ${safe(selectedService || businessType)}`,
                `Problem: ${safe(problem)}`,
                `Intent (Urgency): ${safe(intent || timeline)}`,
                `Answers: ${formattedAnswers}`,
                '',
                `Date: ${new Date().toLocaleString('mk-MK', { timeZone: 'Europe/Skopje' })}`
            ];

        const text = lines.join('\n');

        // Debug: log email content
            // ...existing code...

        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: RECEIVER,
            subject: `New Lead: ${safe(selectedService || businessType, 50)}`,
            text
        });

        // Debug: log email send status
            // ...existing code...

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error('Email send error:', err.message);
        res.status(500).json({ error: 'Failed to send email' });
    }
};
