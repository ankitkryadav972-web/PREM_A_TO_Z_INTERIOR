import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';

/**
 * 404 Not Found Middleware for unhandled routes
 */
export const notFoundHandler = (req, res, next) => {
  next(ApiError.notFound(`Cannot find ${req.method} ${req.originalUrl} on this server`, 'ROUTE_NOT_FOUND'));
};

/**
 * Centralized Error Handling Middleware
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || 'INTERNAL_SERVER_ERROR';
  let message = err.message || 'Something went wrong on the server';
  let details = err.details || null;

  // Handle Mongoose CastError (Invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    errorCode = 'INVALID_ID_FORMAT';
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // Handle Mongoose Duplicate Key Error (E11000)
  if (err.code === 11000) {
    statusCode = 409;
    errorCode = 'DUPLICATE_RESOURCE';
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const value = err.keyValue ? err.keyValue[field] : '';
    message = `A resource with ${field} '${value}' already exists.`;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    errorCode = 'VALIDATION_ERROR';
    message = 'Validation failed';
    details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message
    }));
  }

  // Handle Multer upload errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    errorCode = 'FILE_UPLOAD_ERROR';
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'File size is too large. Maximum allowed size is 5MB.';
    } else {
      message = err.message;
    }
  }

  // Log error in development or if 500
  if (env.NODE_ENV === 'development' || statusCode === 500) {
    console.error(`[Error] ${statusCode} ${errorCode}: ${message}`);
    if (statusCode === 500) {
      console.error(err.stack);
    }
  }

  const responsePayload = {
    success: false,
    message,
    error: errorCode
  };

  if (details) {
    responsePayload.details = details;
  }

  if (env.NODE_ENV === 'development' && statusCode === 500) {
    responsePayload.stack = err.stack;
  }

  return res.status(statusCode).json(responsePayload);
};

export default { notFoundHandler, errorHandler };
