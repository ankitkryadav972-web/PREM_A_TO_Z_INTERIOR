import { Enquiry } from '../models/enquiry.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Submit new enquiry / contact message
 * @route   POST /api/enquiries
 * @access  Public
 */
export const createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  const enquiry = await Enquiry.create({
    name: name.trim(),
    email: (email || '').trim().toLowerCase(),
    phone: phone.trim(),
    service: (service || 'General Enquiry').trim(),
    message: message.trim(),
    status: 'new',
    userId: req.user ? req.user._id : null
  });

  return sendResponse(
    res,
    201,
    'Enquiry submitted successfully. Our team will contact you shortly.',
    { enquiry }
  );
});

/**
 * @desc    Get enquiries submitted by the current authenticated user
 * @route   GET /api/enquiries/my
 * @access  Private
 */
export const getMyEnquiries = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(50, parseInt(req.query.limit || '10', 10)));
  const skip = (page - 1) * limit;

  // Match by logged in userId OR matching phone or email
  const filter = {
    $or: [
      { userId: req.user._id },
      { mobile: req.user.mobile },
      { phone: req.user.mobile },
      { email: req.user.email }
    ]
  };

  const [total, enquiries] = await Promise.all([
    Enquiry.countDocuments(filter),
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'My enquiries fetched successfully',
    enquiries,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get all enquiries (Admin only)
 * @route   GET /api/enquiries
 * @access  Private/Admin
 */
export const getAllEnquiries = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '10', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  if (req.query.status) {
    filter.status = req.query.status;
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [
      { name: searchRegex },
      { email: searchRegex },
      { phone: searchRegex },
      { service: searchRegex },
      { message: searchRegex }
    ];
  }

  const [total, enquiries] = await Promise.all([
    Enquiry.countDocuments(filter),
    Enquiry.find(filter)
      .populate('userId', 'name email mobile role')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Enquiries fetched successfully',
    enquiries,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get single enquiry by ID
 * @route   GET /api/enquiries/:id
 * @access  Private/Admin
 */
export const getEnquiryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const enquiry = await Enquiry.findById(id).populate('userId', 'name email mobile role');
  if (!enquiry) {
    throw ApiError.notFound('Enquiry not found.', 'ENQUIRY_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Enquiry fetched successfully', { enquiry });
});

/**
 * @desc    Update enquiry status
 * @route   PATCH /api/enquiries/:id
 * @access  Private/Admin
 */
export const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const enquiry = await Enquiry.findById(id);
  if (!enquiry) {
    throw ApiError.notFound('Enquiry not found.', 'ENQUIRY_NOT_FOUND');
  }

  enquiry.status = status;
  await enquiry.save();

  return sendResponse(res, 200, 'Enquiry status updated successfully', { enquiry });
});

/**
 * @desc    Delete enquiry
 * @route   DELETE /api/enquiries/:id
 * @access  Private/Admin
 */
export const deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) {
    throw ApiError.notFound('Enquiry not found.', 'ENQUIRY_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Enquiry deleted successfully', null);
});

export default {
  createEnquiry,
  getMyEnquiries,
  getAllEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry
};
