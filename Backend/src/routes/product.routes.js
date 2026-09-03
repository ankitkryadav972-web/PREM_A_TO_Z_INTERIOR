import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/product.controller.js';
import {
  productIdOrSlugValidator,
  createProductValidator,
  updateProductValidator
} from '../validators/product.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllProducts);
router.get('/:id', productIdOrSlugValidator, validate, getProductById);

// Admin-only management routes
router.post('/', protect, authorize('admin'), createProductValidator, validate, createProduct);
router.patch('/:id', protect, authorize('admin'), updateProductValidator, validate, updateProduct);
router.delete('/:id', protect, authorize('admin'), productIdOrSlugValidator, validate, deleteProduct);

export default router;
