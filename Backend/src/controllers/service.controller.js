import mongoose from 'mongoose';
import { Service } from '../models/service.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { slugify } from '../utils/slugify.js';

/**
 * @desc    Get all services
 * @route   GET /api/services
 * @access  Public
 */
export const getAllServices = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '50', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  // For public visitors, show only active services unless admin explicitly requests all
  const isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin || req.query.isActive !== undefined) {
    filter.isActive = req.query.isActive !== undefined ? req.query.isActive === 'true' : true;
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [
      { title: searchRegex },
      { description: searchRegex },
      { shortDescription: searchRegex }
    ];
  }

  const [total, services] = await Promise.all([
    Service.countDocuments(filter),
    Service.find(filter).sort({ createdAt: 1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Services fetched successfully',
    services,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get single service by ID or Slug
 * @route   GET /api/services/:id
 * @access  Public
 */
export const getServiceById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let service;
  if (mongoose.Types.ObjectId.isValid(id)) {
    service = await Service.findById(id);
  } else {
    service = await Service.findOne({ slug: id.toLowerCase().trim() });
  }

  if (!service) {
    throw ApiError.notFound('Service not found.', 'SERVICE_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Service details fetched successfully', { service });
});

/**
 * @desc    Create new service
 * @route   POST /api/services
 * @access  Private/Admin
 */
export const createService = asyncHandler(async (req, res) => {
  const { title, description, shortDescription, image, features, isActive } = req.body;

  const generatedSlug = slugify(title);
  const existingService = await Service.findOne({ slug: generatedSlug });
  if (existingService) {
    throw ApiError.conflict('A service with this title already exists.', 'SERVICE_ALREADY_EXISTS');
  }

  const service = await Service.create({
    title,
    slug: generatedSlug,
    description,
    shortDescription,
    image: image || '',
    features: Array.isArray(features) ? features : [],
    isActive: isActive !== undefined ? isActive : true
  });

  return sendResponse(res, 201, 'Service created successfully', { service });
});

/**
 * @desc    Update service
 * @route   PATCH /api/services/:id
 * @access  Private/Admin
 */
export const updateService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let service;
  if (mongoose.Types.ObjectId.isValid(id)) {
    service = await Service.findById(id);
  } else {
    service = await Service.findOne({ slug: id });
  }

  if (!service) {
    throw ApiError.notFound('Service not found.', 'SERVICE_NOT_FOUND');
  }

  const { title, description, shortDescription, image, features, isActive } = req.body;

  if (title && title.trim() !== service.title) {
    const newSlug = slugify(title);
    const existingWithSlug = await Service.findOne({ slug: newSlug, _id: { $ne: service._id } });
    if (existingWithSlug) {
      throw ApiError.conflict('Another service already exists with this title.', 'SERVICE_ALREADY_EXISTS');
    }
    service.title = title.trim();
    service.slug = newSlug;
  }

  if (description !== undefined) service.description = description;
  if (shortDescription !== undefined) service.shortDescription = shortDescription;
  if (image !== undefined) service.image = image;
  if (features !== undefined) service.features = features;
  if (isActive !== undefined) service.isActive = isActive;

  await service.save();

  return sendResponse(res, 200, 'Service updated successfully', { service });
});

/**
 * @desc    Delete service
 * @route   DELETE /api/services/:id
 * @access  Private/Admin
 */
export const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let service;
  if (mongoose.Types.ObjectId.isValid(id)) {
    service = await Service.findByIdAndDelete(id);
  } else {
    service = await Service.findOneAndDelete({ slug: id });
  }

  if (!service) {
    throw ApiError.notFound('Service not found.', 'SERVICE_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Service deleted successfully', null);
});

export default { getAllServices, getServiceById, createService, updateService, deleteService };
