import { body, param } from 'express-validator';

export const productIdOrSlugValidator = [
  param('id')
    .notEmpty()
    .withMessage('Product ID or slug is required')
];

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 150 })
    .withMessage('Product name cannot exceed 150 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('description')
    .optional()
    .trim(),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of image URLs or paths'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array of strings'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

export const updateProductValidator = [
  param('id')
    .notEmpty()
    .withMessage('Product ID is required'),
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Product name cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Product name cannot exceed 150 characters'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  body('description')
    .optional()
    .trim(),
  body('images')
    .optional()
    .isArray()
    .withMessage('Images must be an array of strings'),
  body('features')
    .optional()
    .isArray()
    .withMessage('Features must be an array of strings'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean')
];

export default { productIdOrSlugValidator, createProductValidator, updateProductValidator };
