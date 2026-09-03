import { validationResult } from 'express-validator';
import { ApiError } from '../utils/apiError.js';

/**
 * Middleware that checks for validation errors from express-validator
 */
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg,
      value: err.value
    }));

    return next(
      new ApiError(400, 'Validation failed. Please check your inputs.', 'VALIDATION_ERROR', formattedErrors)
    );
  }

  next();
};

export default validate;
