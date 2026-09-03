import { ApiError } from '../utils/apiError.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Upload an image file
 * @route   POST /api/uploads
 * @access  Private/Admin
 */
export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw ApiError.badRequest('No image file provided for upload.', 'NO_FILE_UPLOADED');
  }

  const relativeUrl = `/uploads/${req.file.filename}`;

  return sendResponse(res, 201, 'Image uploaded successfully', {
    url: relativeUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

export default { uploadImage };
