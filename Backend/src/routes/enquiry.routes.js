import express from 'express';
import {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
} from '../controllers/enquiry.controller.js';
import {
  enquiryIdValidator,
  createEnquiryValidator,
  updateEnquiryStatusValidator
} from '../validators/enquiry.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize, optionalAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: Submit enquiry (captures user ID if user is logged in)
router.post('/', optionalAuth, createEnquiryValidator, validate, createEnquiry);

// Authenticated Customer: View own submitted enquiries
router.get('/my', protect, getMyEnquiries);

// Admin: Manage all enquiries
router.get('/', protect, authorize('admin'), getAllEnquiries);
router.get('/:id', protect, authorize('admin'), enquiryIdValidator, validate, getEnquiryById);
router.patch('/:id', protect, authorize('admin'), updateEnquiryStatusValidator, validate, updateEnquiryStatus);
router.delete('/:id', protect, authorize('admin'), enquiryIdValidator, validate, deleteEnquiry);

export default router;
