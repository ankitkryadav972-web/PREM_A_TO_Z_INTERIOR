import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [150, 'Name cannot exceed 150 characters']
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      index: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true
    },
    description: {
      type: String,
      default: ''
    },
    images: {
      type: [String],
      default: []
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
productSchema.pre('save', function () {
  if (!this.slug || this.isModified('name')) {
    this.slug = slugify(this.name);
  }
});

export const Product = mongoose.model('Product', productSchema);
export default Product;
