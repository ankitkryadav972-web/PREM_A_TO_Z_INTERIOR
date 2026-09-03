import express from 'express';
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
} from '../controllers/testimonial.controller.js';
import {
  testimonialIdValidator,
  createTestimonialValidator,
  updateTestimonialValidator
} from '../validators/testimonial.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllTestimonials);
router.get('/:id', testimonialIdValidator, validate, getTestimonialById);

// Admin-only management routes
router.post('/', protect, authorize('admin'), createTestimonialValidator, validate, createTestimonial);
router.patch('/:id', protect, authorize('admin'), updateTestimonialValidator, validate, updateTestimonial);
router.delete('/:id', protect, authorize('admin'), testimonialIdValidator, validate, deleteTestimonial);

export default router;
