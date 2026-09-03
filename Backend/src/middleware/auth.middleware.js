import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Protect routes: requires valid Bearer JWT token
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw ApiError.unauthorized('Authentication required. Please log in to continue.', 'AUTHENTICATION_REQUIRED');
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      throw ApiError.unauthorized('The user belonging to this token no longer exists.', 'USER_NOT_FOUND');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated. Please contact support.', 'ACCOUNT_DEACTIVATED');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    if (err.name === 'JsonWebTokenError') {
      throw ApiError.unauthorized('Invalid authentication token.', 'INVALID_TOKEN');
    }
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Authentication token has expired. Please log in again.', 'TOKEN_EXPIRED');
    }
    throw err;
  }
});

/**
 * Optional authentication: attaches req.user if valid token present, otherwise proceeds
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    } catch {
      // Ignore token errors for optional authentication
    }
  }

  next();
});

/**
 * Restrict access to specified roles
 *
 * @param {...string} roles - Allowed roles e.g. 'admin'
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required.', 'AUTHENTICATION_REQUIRED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(
          `User role '${req.user.role}' is not authorized to access this resource.`,
          'FORBIDDEN'
        )
      );
    }

    next();
  };
};

export default { protect, optionalAuth, authorize };
