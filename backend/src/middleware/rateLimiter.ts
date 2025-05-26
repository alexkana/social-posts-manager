import type { RateLimitRequestHandler, Options } from 'express-rate-limit';

const rateLimit = require('express-rate-limit');

// More strict limiting for login attempts (prevent brute force)
export const loginLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per IP in the window
  message: { status: 'error', message: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
} as Options);

// Less strict for registration
export const registerLimiter: RateLimitRequestHandler = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // 3 registration attempts per IP per hour
  message: { status: 'error', message: 'Too many accounts created, please try again after an hour' },
  standardHeaders: true,
  legacyHeaders: false,
} as Options);

