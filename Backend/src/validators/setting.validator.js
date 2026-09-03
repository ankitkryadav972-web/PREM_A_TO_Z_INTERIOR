import { body } from 'express-validator';

export const updateSettingValidator = [
  body('businessName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Business name cannot be empty'),
  body('phones')
    .optional()
    .isArray()
    .withMessage('Phones must be an array of phone strings'),
  body('whatsAppNumbers')
    .optional()
    .isArray()
    .withMessage('WhatsApp numbers must be an array of phone strings'),
  body('address')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Address cannot be empty'),
  body('email')
    .optional()
    .trim(),
  body('instagram')
    .optional()
    .trim(),
  body('homepage')
    .optional()
    .isObject()
    .withMessage('Homepage settings must be an object'),
  body('workingHours')
    .optional()
    .trim()
];

export default { updateSettingValidator };
