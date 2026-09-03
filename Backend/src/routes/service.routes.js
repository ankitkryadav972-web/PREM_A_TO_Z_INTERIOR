import express from 'express';
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/service.controller.js';
import {
  serviceIdOrSlugValidator,
  createServiceValidator,
  updateServiceValidator
} from '../validators/service.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllServices);
router.get('/:id', serviceIdOrSlugValidator, validate, getServiceById);

// Admin-only management routes
router.post('/', protect, authorize('admin'), createServiceValidator, validate, createService);
router.patch('/:id', protect, authorize('admin'), updateServiceValidator, validate, updateService);
router.delete('/:id', protect, authorize('admin'), serviceIdOrSlugValidator, validate, deleteService);

export default router;
