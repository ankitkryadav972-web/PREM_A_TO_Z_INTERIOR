import { body, param } from 'express-validator';

export const galleryIdValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid gallery item ID format')
];

export const createGalleryValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image URL or path is required'),
  body('description')
    .optional()
    .trim(),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

export const updateGalleryValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid gallery item ID format'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 150 })
    .withMessage('Title cannot exceed 150 characters'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category cannot be empty'),
  body('image')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Image cannot be empty'),
  body('description')
    .optional()
    .trim(),
  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean')
];

export default { galleryIdValidator, createGalleryValidator, updateGalleryValidator };
