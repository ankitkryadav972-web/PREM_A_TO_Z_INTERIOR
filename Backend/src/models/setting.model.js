import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
      default: 'PREM A TO Z INTERIOR DESIGN'
    },
    phones: {
      type: [String],
      default: ['9454107810']
    },
    whatsAppNumbers: {
      type: [String],
      default: ['7458905073', '9454107810']
    },
    address: {
      type: String,
      required: true,
      default: 'BAHARAMPUR URF PIPRAPUR, GORAKHPUR'
    },
    email: {
      type: String,
      default: '' // Not provided - do not invent
    },
    instagram: {
      type: String,
      default: '' // Not provided - do not invent
    },
    homepage: {
      heroTitle: {
        type: String,
        default: 'Transform Your Space with Prem A to Z Interior Design'
      },
      heroSubtitle: {
        type: String,
        default: 'Expert Doors, Modular Kitchens, POP & False Ceilings, Electrical and Complete Furniture Work'
      },
      ctaText: {
        type: String,
        default: 'Book a Free Consultation'
      },
      ctaLink: {
        type: String,
        default: '#contact'
      },
      aboutText: {
        type: String,
        default: 'PREM A TO Z INTERIOR DESIGN brings your dream spaces to life with expert craftsmanship, premium materials, and tailored turnkey interior solutions in Gorakhpur.'
      }
    },
    workingHours: {
      type: String,
      default: 'Monday - Saturday: 9:00 AM - 8:00 PM'
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Setting = mongoose.model('Setting', settingSchema);
export default Setting;
