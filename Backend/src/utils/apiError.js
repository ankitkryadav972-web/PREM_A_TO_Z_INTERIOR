/**
 * Custom API Error class for predictable, consistent error handling.
 */
export class ApiError extends Error {
  /**
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Human-readable error message
   * @param {string} [errorCode='INTERNAL_SERVER_ERROR'] - Machine-readable error code
   * @param {any} [details=null] - Additional details or validation errors
   */
  constructor(statusCode = 500, message = 'Internal Server Error', errorCode = 'INTERNAL_SERVER_ERROR', details = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errorCode = 'BAD_REQUEST', details = null) {
    return new ApiError(400, message, errorCode, details);
  }

  static unauthorized(message = 'Unauthorized access', errorCode = 'UNAUTHORIZED', details = null) {
    return new ApiError(401, message, errorCode, details);
  }

  static forbidden(message = 'Access forbidden', errorCode = 'FORBIDDEN', details = null) {
    return new ApiError(403, message, errorCode, details);
  }

  static notFound(message = 'Resource not found', errorCode = 'NOT_FOUND', details = null) {
    return new ApiError(404, message, errorCode, details);
  }

  static conflict(message = 'Resource conflict', errorCode = 'CONFLICT', details = null) {
    return new ApiError(409, message, errorCode, details);
  }

  static internal(message = 'Internal server error', errorCode = 'INTERNAL_SERVER_ERROR', details = null) {
    return new ApiError(500, message, errorCode, details);
  }
}

export default ApiError;
