import { User } from '../models/user.model.js';
import { Service } from '../models/service.model.js';
import { Product } from '../models/product.model.js';
import { Gallery } from '../models/gallery.model.js';
import { Enquiry } from '../models/enquiry.model.js';
import { Testimonial } from '../models/testimonial.model.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * @desc    Get admin dashboard metrics and overview statistics
 * @route   GET /api/admin/dashboard
 * @access  Private/Admin
 */
export const getDashboardStats = asyncHandler(async (req, res) => {
  const [
    totalUsers,
    totalServices,
    totalProducts,
    totalGalleryItems,
    totalTestimonials,
    totalEnquiries,
    newEnquiries,
    recentEnquiries
  ] = await Promise.all([
    User.countDocuments(),
    Service.countDocuments(),
    Product.countDocuments(),
    Gallery.countDocuments(),
    Testimonial.countDocuments(),
    Enquiry.countDocuments(),
    Enquiry.countDocuments({ status: 'new' }),
    Enquiry.find()
      .populate('userId', 'name email mobile')
      .sort({ createdAt: -1 })
      .limit(5)
  ]);

  const stats = {
    totalUsers,
    totalServices,
    totalProducts,
    totalGalleryItems,
    totalTestimonials,
    totalEnquiries,
    newEnquiries,
    recentEnquiries
  };

  return sendResponse(res, 200, 'Admin dashboard statistics fetched successfully', stats);
});

export default { getDashboardStats };
