import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const businessRatesSchema = new Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property',
    required: true,
    unique: true,
  },
  rateable_value_gbp: {
    type: Number,
    required: true,
    min: 0,
  },
  rates_payable_gbp: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

// Indexes
businessRatesSchema.index({ property_id: 1 });
businessRatesSchema.index({ rateable_value_gbp: 1 });
businessRatesSchema.index({ rates_payable_gbp: 1 });

export default model('business_rates', businessRatesSchema);
