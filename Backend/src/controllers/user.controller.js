import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.role) {
    filter.role = req.query.role;
  }

  if (req.query.isActive !== undefined) {
    filter.isActive = req.query.isActive === 'true';
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [{ name: searchRegex }, { email: searchRegex }, { mobile: searchRegex }];
  }

  const [total, users] = await Promise.all([
    User.countDocuments(filter),
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Users fetched successfully',
    users,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get user by ID
 * @route   GET /api/users/:id
 * @access  Private (Self or Admin)
 */
export const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Authorization check: Admin or self
  if (req.user.role !== 'admin' && req.user._id.toString() !== id) {
    throw ApiError.forbidden('You are not authorized to view another user profile.', 'FORBIDDEN');
  }

  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound('User not found.', 'USER_NOT_FOUND');
  }

  return sendResponse(res, 200, 'User fetched successfully', { user });
});

/**
 * @desc    Update user
 * @route   PATCH /api/users/:id
 * @access  Private (Self or Admin)
 */
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const isAdmin = req.user.role === 'admin';
  const isSelf = req.user._id.toString() === id;

  if (!isAdmin && !isSelf) {
    throw ApiError.forbidden('You are not authorized to update this profile.', 'FORBIDDEN');
  }

  const user = await User.findById(id);
  if (!user) {
    throw ApiError.notFound('User not found.', 'USER_NOT_FOUND');
  }

  const { name, mobile, email, role, isActive } = req.body;

  // If email is changing, check uniqueness
  if (email && email.toLowerCase().trim() !== user.email) {
    const emailExists = await User.findOne({ email: email.toLowerCase().trim() });
    if (emailExists) {
      throw ApiError.conflict('Email address is already in use.', 'EMAIL_ALREADY_EXISTS');
    }
    user.email = email.toLowerCase().trim();
  }

  // If mobile is changing, check uniqueness
  if (mobile && mobile.trim() !== user.mobile) {
    const mobileExists = await User.findOne({ mobile: mobile.trim() });
    if (mobileExists) {
      throw ApiError.conflict('Mobile number is already in use.', 'MOBILE_ALREADY_EXISTS');
    }
    user.mobile = mobile.trim();
  }

  if (name) user.name = name.trim();

  // Admin-only fields
  if (isAdmin) {
    if (role) user.role = role;
    if (isActive !== undefined) user.isActive = isActive;
  }

  await user.save();

  return sendResponse(res, 200, 'User updated successfully', { user });
});

/**
 * @desc    Delete user
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Prevent admin from deleting themselves
  if (req.user._id.toString() === id) {
    throw ApiError.badRequest('Administrators cannot delete their own account.', 'CANNOT_DELETE_SELF');
  }

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw ApiError.notFound('User not found.', 'USER_NOT_FOUND');
  }

  return sendResponse(res, 200, 'User deleted successfully', null);
});

export default { getAllUsers, getUserById, updateUser, deleteUser };
