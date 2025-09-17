import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema, model } = mongoose;

// Main property schema
const propertySchema = new Schema(
  {
    // Reference to the user who listed the property
    listed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },

    // General Property Details
    general_details: {
      building_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      country_region: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        default: 'United Kingdom',
      },
      town_city: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      postcode: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        match: [/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i, 'Please enter a valid UK postcode'],
      },
      sale_status: {
        type: String,
        enum: ['Available', 'Under Offer', 'Sold', 'Let', 'Withdrawn'],
        required: true,
        default: 'Available',
      },
      property_type: {
        type: String,
        required: true,
        enum: [
          'Office',
          'Retail',
          'Industrial',
          'Warehouse',
          'Land',
          'Leisure',
          'Healthcare',
          'Education',
          'Hotel',
          'Restaurant',
          'Student Accommodation',
          'Car Park',
          'Data Centre',
          'Other',
        ],
      },
      property_sub_type: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      max_eaves_height: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
      },
      size_minimum: {
        type: Number,
        required: true,
        min: 0,
        description: 'Size in square feet',
      },
      size_maximum: {
        type: Number,
        required: true,
        min: 0,
        description: 'Size in square feet',
      },
      invoice_details: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
      },
      property_notes: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
      },
      approximate_year_of_construction: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear() + 5,
      },
      expansion_capacity_percent: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
    },

    // Business Rates - Reference (Optional)
    business_rates_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'business_rates',
      description: 'Reference to business rates collection',
      default: null,
    },

    // Descriptions - Reference (Optional)
    descriptions_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'descriptions',
      description: 'Reference to descriptions collection',
      default: null,
    },

    // Sale Types - Reference (Optional)
    sale_types_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sale_types',
      description: 'Reference to sale types collection',
      default: null,
    },

    // References to sub-schemas
    images_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_images',
      description: 'Reference to property images collection',
    },
    documents_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_documents',
      description: 'Reference to property documents collection',
    },
    location_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_location',
      description: 'Reference to property location collection',
    },
    virtual_tours_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_virtual_tours',
      description: 'Reference to property virtual tours collection',
    },
    features_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_features',
      description: 'Reference to property features collection',
    },
    joint_agents_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property_joint_agents',
      description: 'Reference to property joint agents collection',
    },


    // --- Energy & Efficiency ---
    epc: {
      rating: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Exempt', 'Not Required'],
        description: 'EPC rating (A = best, G = worst)',
      },
      score: {
        type: Number,
        min: 0,
        max: 100,
        description: 'Numerical EPC score (0–100)',
      },
      certificate_number: {
        type: String,
        description: 'Official EPC certificate reference number',
      },
      expiry_date: {
        type: Date,
        description: 'Date when EPC certificate expires',
      },
    },

    // --- Tax & Valuation ---
    council_tax: {
      band: {
        type: String,
        enum: ['A','B','C','D','E','F','G','H','Exempt','Not Applicable'],
        description: 'Council tax band of the property',
      },
      authority: {
        type: String,
        description: 'Local council/authority name',
      },
    },
    rateable_value: {
      type: Number,
      min: 0,
      description: 'VOA rateable value (for commercial properties)',
    },

    // --- Planning & Permissions ---
    planning: {
      status: {
        type: String,
        enum: ['Full Planning', 'Outline Planning', 'No Planning Required', 'Unknown'],
        description: 'Planning permission status',
      },
      application_number: {
        type: String,
        description: 'Planning application reference number (if available)',
      },
      decision_date: {
        type: Date,
        description: 'Date planning decision was issued',
      },
    },

    // --- Property Status ---
    property_status: {
      type: String,
      enum: ['Active', 'Inactive', 'Sold', 'Let', 'Withdrawn'],
      default: 'Active',
    },

    // Property status and visibility
    is_active: {
      type: Boolean,
      default: true,
    },
    is_featured: {
      type: Boolean,
      default: false,
    },
    is_verified: {
      type: Boolean,
      default: false,
    },

    // View and contact tracking

    // Soft delete
    deleted_at: {
      type: Date,
      default: null,
    },

    // SEO fields
    meta_title: {
      type: String,
      trim: true,
      maxlength: 60,
    },
    meta_description: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
propertySchema.index({ 'general_details.postcode': 1 });
propertySchema.index({ 'general_details.town_city': 1 });
propertySchema.index({ 'general_details.property_type': 1 });
propertySchema.index({ 'general_details.sale_status': 1 });
propertySchema.index({ listed_by: 1 });
propertySchema.index({ is_active: 1 });
propertySchema.index({ is_featured: 1 });
propertySchema.index({ created_at: -1 });

// Indexes for sub-schema references
propertySchema.index({ business_rates_id: 1 });
propertySchema.index({ descriptions_id: 1 });
propertySchema.index({ sale_types_id: 1 });
propertySchema.index({ images_id: 1 });
propertySchema.index({ documents_id: 1 });
propertySchema.index({ location_id: 1 });
propertySchema.index({ virtual_tours_id: 1 });
propertySchema.index({ features_id: 1 });
propertySchema.index({ joint_agents_id: 1 });

// Virtual for full address
propertySchema.virtual('full_address').get(function() {
  const address = this.general_details.address;
  const parts = [
    address,
    this.general_details.town_city,
    this.general_details.postcode,
    this.general_details.country_region
  ].filter(Boolean);
  return parts.join(', ');
});

// Virtual for property size range
propertySchema.virtual('size_range').get(function() {
  const min = this.general_details.size_minimum;
  const max = this.general_details.size_maximum;
  if (min && max) {
    return `${min.toLocaleString()} - ${max.toLocaleString()} sq ft`;
  } else if (min) {
    return `From ${min.toLocaleString()} sq ft`;
  } else if (max) {
    return `Up to ${max.toLocaleString()} sq ft`;
  }
  return null;
});

// Virtual for formatted price (requires population of sale_types_id)
propertySchema.virtual('formatted_price').get(function() {
  if (this.sale_types_id && this.sale_types_id.sale_types && this.sale_types_id.sale_types.length > 0) {
    const saleType = this.sale_types_id.sale_types[0];
    const formattedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(saleType.price_value);
    return `${formattedPrice} ${saleType.price_unit}`;
  }
  return null;
});

// Virtual for property completeness status
propertySchema.virtual('completeness_status').get(function() {
  const status = {
    general_details: !!this.general_details.property_type,
    business_rates: !!this.business_rates_id,
    descriptions: !!this.descriptions_id,
    sale_types: !!this.sale_types_id,
    images: !!this.images_id,
    documents: !!this.documents_id,
    location: !!this.location_id,
    virtual_tours: !!this.virtual_tours_id,
    features: !!this.features_id,
    joint_agents: !!this.joint_agents_id,
  };
  
  const completedSteps = Object.values(status).filter(Boolean).length;
  const totalSteps = Object.keys(status).length;
  
  return {
    ...status,
    completed_steps: completedSteps,
    total_steps: totalSteps,
    completion_percentage: Math.round((completedSteps / totalSteps) * 100),
  };
});

// Pre-save middleware to generate slug
propertySchema.pre('save', function(next) {
  if (this.isModified('general_details.building_name') || this.isNew) {
    const buildingName = this.general_details.building_name || 'property';
    const postcode = this.general_details.postcode;
    const timestamp = Date.now();
    this.slug = `${buildingName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${postcode.toLowerCase().replace(/\s/g, '')}-${timestamp}`;
  }
  next();
});

// Ensure at least one sale type is provided
// propertySchema.pre('save', function(next) {
//   if (this.sale_types.length === 0) {
//     return next(new Error('At least one sale type must be provided'));
//   }
//   next();
// });

// Plugin for pagination
propertySchema.plugin(mongoosePaginate);

export default model('property', propertySchema);
