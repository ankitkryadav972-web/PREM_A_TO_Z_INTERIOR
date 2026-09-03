import express from 'express';
import healthRoutes from './health.routes.js';
import authRoutes from './auth.routes.js';
import userRoutes from './user.routes.js';
import serviceRoutes from './service.routes.js';
import productRoutes from './product.routes.js';
import galleryRoutes from './gallery.routes.js';
import testimonialRoutes from './testimonial.routes.js';
import enquiryRoutes from './enquiry.routes.js';
import settingRoutes from './setting.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import uploadRoutes from './upload.routes.js';

const router = express.Router();

// Mount all resource sub-routers
router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/services', serviceRoutes);
router.use('/products', productRoutes);
router.use('/gallery', galleryRoutes);
router.use('/testimonials', testimonialRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/settings', settingRoutes);
router.use('/admin', dashboardRoutes);
router.use('/uploads', uploadRoutes);

export default router;
