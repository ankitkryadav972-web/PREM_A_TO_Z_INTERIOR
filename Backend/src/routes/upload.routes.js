import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';
import { upload } from '../middleware/upload.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin: Upload single image
router.post('/', protect, authorize('admin'), upload.single('image'), uploadImage);

export default router;
