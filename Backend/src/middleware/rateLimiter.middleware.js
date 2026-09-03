import rateLimit from 'express-rate-limit';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

/**
 * General API Rate Limiter
 */
export const apiLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new ApiError(
        429,
        'Too many requests from this IP address, please try again later.',
        'RATE_LIMIT_EXCEEDED'
      )
    );
  }
});

/**
 * Stricter Rate Limiter for Authentication endpoints
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: env.AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(
      new ApiError(
        429,
        'Too many authentication attempts. Please try again after 15 minutes.',
        'AUTH_RATE_LIMIT_EXCEEDED'
      )
    );
  }
});

export default { apiLimiter, authLimiter };
