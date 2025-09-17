import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Sale type sub-schema
const saleTypeSchema = new Schema({
  sale_type: {
    type: String,
    required: true,
    enum: ['Freehold', 'Leasehold', 'To Let', 'For Sale', 'Under Offer', 'Sold', 'Let'],
  },
  price_currency: {
    type: String,
    required: true,
    enum: ['GBP'],
    default: 'GBP',
  },
  price_value: {
    type: Number,
    required: true,
    min: 0,
  },
  price_unit: {
    type: String,
    required: true,
    enum: ['per sq ft', 'per annum', 'per month', 'per unit', 'total'],
  },
});

const saleTypesSchema = new Schema({
  property_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'property',
    required: true,
    unique: true,
  },
  sale_types: [saleTypeSchema],
}, {
  timestamps: true,
});

// Indexes
saleTypesSchema.index({ property_id: 1 });
saleTypesSchema.index({ 'sale_types.sale_type': 1 });
saleTypesSchema.index({ 'sale_types.price_value': 1 });
saleTypesSchema.index({ 'sale_types.price_unit': 1 });

// Virtual for active sale types
saleTypesSchema.virtual('active_sale_types').get(function() {
  return this.sale_types.filter(saleType => 
    ['For Sale', 'To Let', 'Under Offer'].includes(saleType.sale_type)
  );
});

// Virtual for sold/let sale types
saleTypesSchema.virtual('completed_sale_types').get(function() {
  return this.sale_types.filter(saleType => 
    ['Sold', 'Let'].includes(saleType.sale_type)
  );
});

// Method to add a sale type
saleTypesSchema.methods.addSaleType = function(saleTypeData) {
  this.sale_types.push(saleTypeData);
  return this.save();
};

// Method to update a sale type
saleTypesSchema.methods.updateSaleType = function(saleTypeId, updateData) {
  const saleType = this.sale_types.id(saleTypeId);
  if (saleType) {
    Object.assign(saleType, updateData);
    return this.save();
  }
  throw new Error('Sale type not found');
};

// Method to remove a sale type
saleTypesSchema.methods.removeSaleType = function(saleTypeId) {
  this.sale_types.pull(saleTypeId);
  return this.save();
};

export default model('sale_types', saleTypesSchema);
