import { Gallery } from '../models/gallery.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get all gallery items
 * @route   GET /api/gallery
 * @access  Public
 */
export const getAllGallery = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '16', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  const isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin || req.query.isPublished !== undefined) {
    filter.isPublished = req.query.isPublished !== undefined ? req.query.isPublished === 'true' : true;
  }

  if (req.query.category) {
    filter.category = new RegExp(`^${req.query.category.trim()}$`, 'i');
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [{ title: searchRegex }, { description: searchRegex }, { category: searchRegex }];
  }

  const [total, items] = await Promise.all([
    Gallery.countDocuments(filter),
    Gallery.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Gallery items fetched successfully',
    items,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get single gallery item by ID
 * @route   GET /api/gallery/:id
 * @access  Public
 */
export const getGalleryById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Gallery.findById(id);
  if (!item) {
    throw ApiError.notFound('Gallery item not found.', 'GALLERY_ITEM_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Gallery item fetched successfully', { item });
});

/**
 * @desc    Create new gallery item
 * @route   POST /api/gallery
 * @access  Private/Admin
 */
export const createGallery = asyncHandler(async (req, res) => {
  const { title, category, image, description, isPublished } = req.body;

  const item = await Gallery.create({
    title,
    category,
    image,
    description: description || '',
    isPublished: isPublished !== undefined ? isPublished : true
  });

  return sendResponse(res, 201, 'Gallery item created successfully', { item });
});

/**
 * @desc    Update gallery item
 * @route   PATCH /api/gallery/:id
 * @access  Private/Admin
 */
export const updateGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Gallery.findById(id);
  if (!item) {
    throw ApiError.notFound('Gallery item not found.', 'GALLERY_ITEM_NOT_FOUND');
  }

  const { title, category, image, description, isPublished } = req.body;

  if (title !== undefined) item.title = title.trim();
  if (category !== undefined) item.category = category.trim();
  if (image !== undefined) item.image = image;
  if (description !== undefined) item.description = description;
  if (isPublished !== undefined) item.isPublished = isPublished;

  await item.save();

  return sendResponse(res, 200, 'Gallery item updated successfully', { item });
});

/**
 * @desc    Delete gallery item
 * @route   DELETE /api/gallery/:id
 * @access  Private/Admin
 */
export const deleteGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const item = await Gallery.findByIdAndDelete(id);
  if (!item) {
    throw ApiError.notFound('Gallery item not found.', 'GALLERY_ITEM_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Gallery item deleted successfully', null);
});

export default { getAllGallery, getGalleryById, createGallery, updateGallery, deleteGallery };
