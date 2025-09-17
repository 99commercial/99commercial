import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertyImagesSchema = new Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
    },
    images: [{
      url: {
        type: String,
        required: true,
        match: [/^https?:\/\/.+/, 'Must be a valid URL'],
      },
      caption: {
        type: String,
        trim: true,
        maxlength: 500,
      },
      image_type: {
        type: String,
        enum: ['Photo', 'Floor Plan', 'EPC', 'Site Plan', 'Exterior', 'Interior', 'Aerial', 'Other'],
        required: true,
        default: 'Photo',
      },
      file_name: {
        type: String,
        required: true,
        trim: true,
      },
      file_size: {
        type: Number,
        required: true,
        min: 0,
        max: 157286400, // 150MB in bytes
      },
      mime_type: {
        type: String,
        enum: ['image/jpeg', 'image/jpg', 'image/gif', 'image/png'],
        required: true,
      },
      order: {
        type: Number,
        required: true,
        min: 0,
        description: 'Order of display, first image (order 0) used for thumbnails',
      },
      is_thumbnail: {
        type: Boolean,
        default: function() {
          return this.order === 0;
        },
      },
      upload_status: {
        type: String,
        enum: ['Processing', 'Completed', 'Failed'],
        default: 'Processing',
      },
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes
propertyImagesSchema.index({ property_id: 1 });
propertyImagesSchema.index({ 'images.order': 1 });
propertyImagesSchema.index({ 'images.upload_status': 1 });

// Virtual for thumbnail image
propertyImagesSchema.virtual('thumbnail').get(function() {
  const thumbnailImage = this.images.find(img => img.is_thumbnail);
  return thumbnailImage || this.images[0] || null;
});

// Virtual for completed images count
propertyImagesSchema.virtual('completed_images_count').get(function() {
  return this.images.filter(img => img.upload_status === 'Completed').length;
});

export default model('property_images', propertyImagesSchema);
