import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const descriptionsSchema = new Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property',
    required: true,
    unique: true,
  },
  general: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  accommodation: {
    type: String,
    required: true,
    trim: true,
  },
  terms: {
    type: String,
    required: true,
    trim: true,
  },
  specifications: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

// Indexes
descriptionsSchema.index({ property_id: 1 });
descriptionsSchema.index({ general: 'text', location: 'text', accommodation: 'text' });

export default model('descriptions', descriptionsSchema);
