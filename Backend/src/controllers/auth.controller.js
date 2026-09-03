import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import env from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Generate JWT token for user
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN
    }
  );
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, mobile, password } = req.body;

  // Check if email already registered
  const existingEmail = await User.findOne({ email: email.toLowerCase().trim() });
  if (existingEmail) {
    throw ApiError.conflict('An account with this email address already exists.', 'EMAIL_ALREADY_EXISTS');
  }

  // Check if mobile already registered
  const existingMobile = await User.findOne({ mobile: mobile.trim() });
  if (existingMobile) {
    throw ApiError.conflict('An account with this mobile number already exists.', 'MOBILE_ALREADY_EXISTS');
  }

  // Create new customer account
  const user = await User.create({
    name,
    email,
    mobile,
    password,
    role: 'customer',
    isActive: true
  });

  const token = generateToken(user);

  return sendResponse(
    res,
    201,
    'User registered successfully',
    {
      user,
      token
    }
  );
});

/**
 * @desc    Login user (via email or mobile)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = asyncHandler(async (req, res) => {
  const { identifier, email, mobile, password } = req.body;
  const loginKey = (identifier || email || mobile || '').trim();

  if (!loginKey || !password) {
    throw ApiError.badRequest('Please provide email or mobile and password.', 'MISSING_CREDENTIALS');
  }

  // Find user by email or mobile, explicitly including password field
  const isEmail = /^\S+@\S+\.\S+$/.test(loginKey);
  const query = isEmail ? { email: loginKey.toLowerCase() } : { mobile: loginKey };

  const user = await User.findOne(query).select('+password');

  if (!user) {
    throw ApiError.unauthorized('Invalid email/mobile or password.', 'INVALID_CREDENTIALS');
  }

  if (!user.isActive) {
    throw ApiError.forbidden('Your account has been deactivated. Please contact support.', 'ACCOUNT_DEACTIVATED');
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw ApiError.unauthorized('Invalid email/mobile or password.', 'INVALID_CREDENTIALS');
  }

  const token = generateToken(user);

  // Return user without password
  const sanitizedUser = user.toJSON();

  return sendResponse(
    res,
    200,
    'Login successful',
    {
      user: sanitizedUser,
      token
    }
  );
});

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private
 */
export const getMe = asyncHandler(async (req, res) => {
  return sendResponse(res, 200, 'Current user profile fetched successfully', {
    user: req.user
  });
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public / Private
 */
export const logout = asyncHandler(async (req, res) => {
  return sendResponse(res, 200, 'Logged out successfully', null);
});

export default { register, login, getMe, logout };
