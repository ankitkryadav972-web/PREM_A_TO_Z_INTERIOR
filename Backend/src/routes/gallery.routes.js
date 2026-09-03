import express from 'express';
import {
  getAllGallery,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery
} from '../controllers/gallery.controller.js';
import {
  galleryIdValidator,
  createGalleryValidator,
  updateGalleryValidator
} from '../validators/gallery.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllGallery);
router.get('/:id', galleryIdValidator, validate, getGalleryById);

// Admin-only management routes
router.post('/', protect, authorize('admin'), createGalleryValidator, validate, createGallery);
router.patch('/:id', protect, authorize('admin'), updateGalleryValidator, validate, updateGallery);
router.delete('/:id', protect, authorize('admin'), galleryIdValidator, validate, deleteGallery);

export default router;
