import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Gallery item title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters']
    },
    category: {
      type: String,
      required: [true, 'Gallery category is required'],
      trim: true,
      index: true
    },
    image: {
      type: String,
      required: [true, 'Image URL or path is required']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    isPublished: {
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

export const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;
