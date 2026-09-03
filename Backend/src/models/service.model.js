import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    description: {
      type: String,
      required: [true, 'Service description is required']
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    image: {
      type: String,
      default: ''
    },
    features: {
      type: [String],
      default: []
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true
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

// Auto-generate slug before save
serviceSchema.pre('save', function () {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title);
  }
});

export const Service = mongoose.model('Service', serviceSchema);
export default Service;
