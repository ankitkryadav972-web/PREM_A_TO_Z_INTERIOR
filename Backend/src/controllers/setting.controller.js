import { Setting } from '../models/setting.model.js';
import { sendResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

/**
 * Helper to ensure at least one settings document exists in the database
 */
const getOrCreateSettings = async () => {
  let settings = await Setting.findOne();
  if (!settings) {
    settings = await Setting.create({
      businessName: 'PREM A TO Z INTERIOR DESIGN',
      phones: ['9454107810'],
      whatsAppNumbers: ['7458905073', '9454107810'],
      address: 'BAHARAMPUR URF PIPRAPUR, GORAKHPUR',
      email: '', // Not provided
      instagram: '', // Not provided
      homepage: {
        heroTitle: 'Transform Your Space with Prem A to Z Interior Design',
        heroSubtitle: 'Expert Doors, Modular Kitchens, POP & False Ceilings, Electrical and Complete Furniture Work',
        ctaText: 'Book a Free Consultation',
        ctaLink: '#contact',
        aboutText: 'PREM A TO Z INTERIOR DESIGN brings your dream spaces to life with expert craftsmanship, premium materials, and tailored turnkey interior solutions in Gorakhpur.'
      },
      workingHours: 'Monday - Saturday: 9:00 AM - 8:00 PM'
    });
  }
  return settings;
};

/**
 * @desc    Get public site settings and contact information
 * @route   GET /api/settings/public
 * @access  Public
 */
export const getPublicSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  return sendResponse(res, 200, 'Site settings fetched successfully', {
    businessName: settings.businessName,
    phones: settings.phones,
    whatsAppNumbers: settings.whatsAppNumbers,
    address: settings.address,
    email: settings.email,
    instagram: settings.instagram,
    homepage: settings.homepage,
    workingHours: settings.workingHours
  });
});

/**
 * @desc    Get complete site settings (Admin only)
 * @route   GET /api/settings
 * @access  Private/Admin
 */
export const getSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  return sendResponse(res, 200, 'Site settings fetched successfully', { settings });
});

/**
 * @desc    Update site settings
 * @route   PATCH /api/settings
 * @access  Private/Admin
 */
export const updateSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();

  const {
    businessName,
    phones,
    whatsAppNumbers,
    address,
    email,
    instagram,
    homepage,
    workingHours
  } = req.body;

  if (businessName !== undefined) settings.businessName = businessName.trim();
  if (phones !== undefined) settings.phones = phones;
  if (whatsAppNumbers !== undefined) settings.whatsAppNumbers = whatsAppNumbers;
  if (address !== undefined) settings.address = address.trim();
  if (email !== undefined) settings.email = email.trim();
  if (instagram !== undefined) settings.instagram = instagram.trim();
  if (homepage !== undefined) {
    settings.homepage = {
      ...settings.homepage.toObject(),
      ...homepage
    };
  }
  if (workingHours !== undefined) settings.workingHours = workingHours.trim();

  await settings.save();

  return sendResponse(res, 200, 'Site settings updated successfully', { settings });
});

export default { getPublicSettings, getSettings, updateSettings };
