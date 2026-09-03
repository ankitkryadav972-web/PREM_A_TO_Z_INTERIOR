import { body, param } from 'express-validator';

export const serviceIdOrSlugValidator = [
  param('id')
    .notEmpty()
    .withMessage('Service ID or slug is required')
];

export const createServiceValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Service title is required')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Service description is required'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),
  body('image')
    .optional()
    .trim(),
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array of strings'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

export const updateServiceValidator = [
  param('id')
    .notEmpty()
    .withMessage('Service ID is required'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 120 })
    .withMessage('Title cannot exceed 120 characters'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('shortDescription')
    .optional()
    .trim()
    .isLength({ max: 300 })
    .withMessage('Short description cannot exceed 300 characters'),
  body('image')
    .optional()
    .trim(),
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array of strings'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

export default { serviceIdOrSlugValidator, createServiceValidator, updateServiceValidator };
