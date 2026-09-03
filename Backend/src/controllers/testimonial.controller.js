import { Testimonial } from '../models/testimonial.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
export const getAllTestimonials = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '20', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  const isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin || req.query.isPublished !== undefined) {
    filter.isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : true;
  }

  const [total, testimonials] = await Promise.all([
    Testimonial.countDocuments(filter),
    Testimonial.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Testimonials fetched successfully',
    testimonials,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get single testimonial by ID
 * @route   GET /api/testimonials/:id
 * @access  Public
 */
export const getTestimonialById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found.', 'TESTIMONIAL_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Testimonial fetched successfully', { testimonial });
});

/**
 * @desc    Create new testimonial
 * @route   POST /api/testimonials
 * @access  Private/Admin
 */
export const createTestimonial = asyncHandler(async (req, res) => {
  const { customerName, location, rating, message, isPublished } = req.body;

  const testimonial = await Testimonial.create({
    customerName,
    location: location || 'Gorakhpur',
    rating,
    message,
    isPublished: isPublished !== undefined ? isPublished : true
  });

  return sendResponse(res, 201, 'Testimonial created successfully', { testimonial });
});

/**
 * @desc    Update testimonial
 * @route   PATCH /api/testimonials/:id
 * @access  Private/Admin
 */
export const updateTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findById(id);
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found.', 'TESTIMONIAL_NOT_FOUND');
  }

  const { customerName, location, rating, message, isPublished } = req.body;

  if (customerName !== undefined) testimonial.customerName = customerName.trim();
  if (location !== undefined) testimonial.location = location.trim();
  if (rating !== undefined) testimonial.rating = rating;
  if (message !== undefined) testimonial.message = message.trim();
  if (isPublished !== undefined) testimonial.isPublished = isPublished;

  await testimonial.save();

  return sendResponse(res, 200, 'Testimonial updated successfully', { testimonial });
});

/**
 * @desc    Delete testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Private/Admin
 */
export const deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testimonial = await Testimonial.findByIdAndDelete(id);
  if (!testimonial) {
    throw ApiError.notFound('Testimonial not found.', 'TESTIMONIAL_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Testimonial deleted successfully', null);
});

export default {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
