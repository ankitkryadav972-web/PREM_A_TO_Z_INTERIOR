import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian mobile number'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
];

export const loginValidator = [
  body('identifier')
    .optional()
    .trim(),
  body('email')
    .optional()
    .trim(),
  body('mobile')
    .optional()
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  body().custom((value, { req }) => {
    if (!req.body.identifier && !req.body.email && !req.body.mobile) {
      throw new Error('Please provide email, mobile, or identifier to log in');
    }
    return true;
  })
];

export default { registerValidator, loginValidator };
