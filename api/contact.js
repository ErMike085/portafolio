/* global process, module */
const rateLimitStore = new Map();

const MAX_REQUESTS_PER_WINDOW = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MIN_FILL_TIME_MS = 1500;
const MAX_NAME_LEN = 120;
const MAX_EMAIL_LEN = 254;
const MAX_MESSAGE_LEN = 2000;

function json(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(payload));
}

function sanitizeText(value) {
  return String(value || '')
    .replace(/[<>{}]/g, '')
    .replace(/[\u0000-\u001f\u007f]/g, '')
    .trim();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function getClientIp(req) {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.length > 0) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }

  return 'unknown';
}

function isAllowedOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) {
    return true;
  }

  const requestHost = req.headers.host ? `https://${req.headers.host}` : '';
  const allowList = [
    ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',').map((v) => v.trim()).filter(Boolean) : []),
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    requestHost,
  ].filter(Boolean);

  if (allowList.length === 0) {
    return true;
  }

  return allowList.includes(origin);
}

function checkRateLimit(ip) {
  const now = Date.now();
  const bucket = rateLimitStore.get(ip) || { count: 0, start: now };

  if (now - bucket.start > RATE_LIMIT_WINDOW_MS) {
    bucket.count = 0;
    bucket.start = now;
  }

  bucket.count += 1;
  rateLimitStore.set(ip, bucket);

  return bucket.count <= MAX_REQUESTS_PER_WINDOW;
}

async function sendWithResend({ name, email, message, ip }) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_TO_EMAIL;
  const contactFrom = process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !contactTo || !contactFrom) {
    throw new Error('missing_email_configuration');
  }

  const payload = {
    from: contactFrom,
    to: [contactTo],
    subject: `Nuevo mensaje de ${name} desde el portafolio`,
    reply_to: email,
    text: `Nombre: ${name}\nEmail: ${email}\nIP: ${ip}\n\nMensaje:\n${message}`,
  };

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('email_provider_error');
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, message: 'Method not allowed' });
  }

  if (!isAllowedOrigin(req)) {
    return json(res, 403, { ok: false, message: 'Forbidden origin' });
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return json(res, 429, { ok: false, message: 'Too many requests' });
  }

  const name = sanitizeText(req.body?.name).slice(0, MAX_NAME_LEN);
  const email = sanitizeText(req.body?.email).slice(0, MAX_EMAIL_LEN);
  const message = sanitizeText(req.body?.message).slice(0, MAX_MESSAGE_LEN);
  const website = sanitizeText(req.body?.website);
  const startedAt = Number(req.body?.startedAt || 0);

  if (website) {
    return json(res, 400, { ok: false, message: 'Invalid request' });
  }

  if (!startedAt || Date.now() - startedAt < MIN_FILL_TIME_MS) {
    return json(res, 400, { ok: false, message: 'Invalid request timing' });
  }

  if (!name || !message || !isValidEmail(email)) {
    return json(res, 400, { ok: false, message: 'Invalid input' });
  }

  try {
    await sendWithResend({ name, email, message, ip });
    return json(res, 200, { ok: true });
  } catch (error) {
    const isConfigError = error instanceof Error && error.message === 'missing_email_configuration';
    return json(res, isConfigError ? 500 : 502, {
      ok: false,
      message: isConfigError ? 'Server email is not configured' : 'Email provider failed',
    });
  }
}
