import express from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin: Get overall statistics and metrics
router.get('/dashboard', protect, authorize('admin'), getDashboardStats);

export default router;
