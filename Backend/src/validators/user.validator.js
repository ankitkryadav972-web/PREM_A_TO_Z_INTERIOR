import { body, param } from 'express-validator';

export const userIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format')
];

export const updateUserValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid user ID format'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('mobile')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Please provide a valid 10-digit Indian mobile number'),
  body('role')
    .optional()
    .isIn(['customer', 'admin', 'employee', 'manager'])
    .withMessage('Invalid role specified'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

export default { userIdValidator, updateUserValidator };
