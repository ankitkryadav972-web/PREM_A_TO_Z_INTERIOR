import { body, param } from 'express-validator';

export const enquiryIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid enquiry ID format')
];

export const createEnquiryValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[0-9+\-\s()]{7,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('email')
    .optional({ checkFalsy: true })
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('service')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Service name cannot exceed 100 characters'),
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 5, max: 2000 })
    .withMessage('Message must be between 5 and 2000 characters')
];

export const updateEnquiryStatusValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid enquiry ID format'),
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['new', 'contacted', 'in-progress', 'completed', 'closed'])
    .withMessage('Status must be one of: new, contacted, in-progress, completed, closed')
];

export default { enquiryIdValidator, createEnquiryValidator, updateEnquiryStatusValidator };
