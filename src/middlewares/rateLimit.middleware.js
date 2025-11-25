const rateLimit = require('express-rate-limit');
const { rateLimit: rlConfig } = require('../config/env');

const generalLimiter = rateLimit({
  windowMs: rlConfig.windowMinutes * 60 * 1000,
  max: rlConfig.max,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try later.' }
});

// stricter limiter for login
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts. Try later.' }
});

module.exports = { generalLimiter, loginLimiter };
