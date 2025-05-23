const rateLimit = require('express-rate-limit');

// More strict limiting for login attempts (prevent brute force)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP in the window
  message: { status: 'error', message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Less strict for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registration attempts per IP per hour
  message: { status: 'error', message: 'Too many accounts created, please try again after an hour' },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { loginLimiter, registerLimiter };