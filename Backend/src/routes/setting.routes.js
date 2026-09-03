import express from 'express';
import { getPublicSettings, getSettings, updateSettings } from '../controllers/setting.controller.js';
import { updateSettingValidator } from '../validators/setting.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public: Fetch business info and homepage content
router.get('/public', getPublicSettings);

// Admin: View full settings and update
router.get('/', protect, authorize('admin'), getSettings);
router.patch('/', protect, authorize('admin'), updateSettingValidator, validate, updateSettings);

export default router;
