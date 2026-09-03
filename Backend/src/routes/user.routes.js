import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller.js';
import { userIdValidator, updateUserValidator } from '../validators/user.validator.js';
import { validate } from '../middleware/validate.middleware.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect); // All user management routes require authentication

router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', userIdValidator, validate, getUserById);
router.patch('/:id', updateUserValidator, validate, updateUser);
router.delete('/:id', authorize('admin'), userIdValidator, validate, deleteUser);

export default router;
