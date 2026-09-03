import mongoose from 'mongoose';
import { Product } from '../models/product.model.js';
import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { slugify } from '../utils/slugify.js';

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page || '1', 10));
  const limit = Math.max(1, Math.min(100, parseInt(req.query.limit || '12', 10)));
  const skip = (page - 1) * limit;

  const filter = {};

  const isAdmin = req.user && req.user.role === 'admin';
  if (!isAdmin || req.query.isActive !== undefined) {
    filter.isActive = req.query.isActive !== undefined ? req.query.isActive === 'true' : true;
  }

  if (req.query.category) {
    filter.category = new RegExp(`^${req.query.category.trim()}$`, 'i');
  }

  if (req.query.search) {
    const searchRegex = new RegExp(req.query.search.trim(), 'i');
    filter.$or = [{ name: searchRegex }, { description: searchRegex }, { category: searchRegex }];
  }

  const [total, products] = await Promise.all([
    Product.countDocuments(filter),
    Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return sendResponse(
    res,
    200,
    'Products fetched successfully',
    products,
    {
      page,
      limit,
      total,
      totalPages
    }
  );
});

/**
 * @desc    Get single product by ID or Slug
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  } else {
    product = await Product.findOne({ slug: id.toLowerCase().trim() });
  }

  if (!product) {
    throw ApiError.notFound('Product not found.', 'PRODUCT_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Product details fetched successfully', { product });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
  const { name, category, description, images, features, isActive } = req.body;

  const generatedSlug = slugify(name);
  const existingProduct = await Product.findOne({ slug: generatedSlug });
  if (existingProduct) {
    throw ApiError.conflict('A product with this name already exists.', 'PRODUCT_ALREADY_EXISTS');
  }

  const product = await Product.create({
    name,
    slug: generatedSlug,
    category,
    description: description || '',
    images: Array.isArray(images) ? images : [],
    features: Array.isArray(features) ? features : [],
    isActive: isActive !== undefined ? isActive : true
  });

  return sendResponse(res, 201, 'Product created successfully', { product });
});

/**
 * @desc    Update product
 * @route   PATCH /api/products/:id
 * @access  Private/Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  } else {
    product = await Product.findOne({ slug: id });
  }

  if (!product) {
    throw ApiError.notFound('Product not found.', 'PRODUCT_NOT_FOUND');
  }

  const { name, category, description, images, features, isActive } = req.body;

  if (name && name.trim() !== product.name) {
    const newSlug = slugify(name);
    const existingWithSlug = await Product.findOne({ slug: newSlug, _id: { $ne: product._id } });
    if (existingWithSlug) {
      throw ApiError.conflict('Another product already exists with this name.', 'PRODUCT_ALREADY_EXISTS');
    }
    product.name = name.trim();
    product.slug = newSlug;
  }

  if (category !== undefined) product.category = category.trim();
  if (description !== undefined) product.description = description;
  if (images !== undefined) product.images = images;
  if (features !== undefined) product.features = features;
  if (isActive !== undefined) product.isActive = isActive;

  await product.save();

  return sendResponse(res, 200, 'Product updated successfully', { product });
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findByIdAndDelete(id);
  } else {
    product = await Product.findOneAndDelete({ slug: id });
  }

  if (!product) {
    throw ApiError.notFound('Product not found.', 'PRODUCT_NOT_FOUND');
  }

  return sendResponse(res, 200, 'Product deleted successfully', null);
});

export default { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
