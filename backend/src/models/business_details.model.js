import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const businessDetailsSchema = new Schema(
  {
    // Basic Business Information
    business_name: {
      type: String,
      trim: true,
    },

    business_type: {
      type: String,
      enum: ['sole_trader', 'partnership', 'limited_company', 'llp'],
    },

    company_registration_number: {
      type: String,
      trim: true,
      required: function() {
        return this.business_type === 'limited_company' || this.business_type === 'llp';
      }
    },

    vat_number: {
      type: String,
      trim: true,
    },
    
    // UK Real Estate Specific Fields
    estate_agent_license: {
      type: String,
      trim: true,
      unique: true,
    },

    property_ombudsman_membership: {
      type: String,
      trim: true,
    },

    redress_scheme: {
      type: String,
      enum: ['property_ombudsman', 'property_redress_scheme', 'ombudsman_services'],
    },

    client_money_protection: {
      type: String,
      trim: true,
    },
    
    // Business Address
    business_address: {
      street: {
        type: String,
        trim: true,
      },
      city: {
        type: String,
        trim: true,
      },
      county: {
        type: String,
        trim: true,
      },
      postcode: {
        type: String,
        trim: true,
        match: [/^[A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}$/i, 'Invalid UK postcode format'],
      },
      country: {
        type: String,
        default: 'United Kingdom',
      },
    },
    
    // Contact Information
    business_phone: {
      type: String,
      match: [/^(\+44|0)[0-9]{10,11}$/, 'Invalid UK phone number format'],
    },

    business_email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
    },

    website: {
      type: String,
      trim: true,
    },
    
    // Services Offered
    services: [{
      type: String,
      enum: [
        'sales',
        'lettings',
        'property_management',
        'valuation',
        'mortgage_advice',
        'conveyancing',
        'surveying',
        'auction_services',
        'commercial_property',
        'new_homes',
        'overseas_property'
      ]
    }],
    
    // Specializations
    specializations: [{
      type: String,
      enum: [
        'residential_sales',
        'residential_lettings',
        'commercial_sales',
        'commercial_lettings',
        'luxury_properties',
        'first_time_buyers',
        'buy_to_let',
        'new_builds',
        'period_properties',
        'apartments',
        'houses',
        'land',
        'development_sites'
      ]
    }],
    
    // Geographic Coverage
    coverage_areas: [{
      type: String,
      trim: true,
    }],
    
    // Business Hours
    business_hours: {
      monday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      tuesday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      wednesday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      thursday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      friday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      saturday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      },
      sunday: {
        open: String,
        close: String,
        closed: { type: Boolean, default: false }
      }
    },
    
    // Professional Qualifications
    qualifications: [{
      qualification_name: String,
      issuing_body: String,
      date_obtained: Date,
      expiry_date: Date,
      certificate_number: String
    }],
    
    // Property Association Memberships
    property_associations: [{
      association_name: {
        type: String,
        enum: [
          'NAEA', // National Association of Estate Agents
          'ARLA', // Association of Residential Letting Agents
          'RICS', // Royal Institution of Chartered Surveyors
          'NALS', // National Approved Letting Scheme
          'UKALA', // UK Association of Letting Agents
          'GPEA', // Guild of Property Professionals
          'RSA', // Residential Sales Association
          'TPO', // The Property Ombudsman
          'PRS', // Property Redress Scheme
          'OS', // Ombudsman Services
          'RICS_Regulated', // RICS Regulated
          'FNAEA', // Fellow of NAEA
          'MARLA', // Member of ARLA
          'MRICS', // Member of RICS
          'other'
        ],    
      },
      membership_number: {
        type: String,
        trim: true
      },
      membership_level: {
        type: String,
        enum: ['student', 'associate', 'member', 'fellow', 'chartered', 'other']
      },
      date_joined: {
        type: Date
      },
      expiry_date: {
        type: Date
      },
      is_active: {
        type: Boolean,
        default: true
      },
      custom_association_name: {
        type: String,
        trim: true,
        required: function() {
          return this.association_name === 'other';
        }
      }
    }],
    
    // Insurance Details
    professional_indemnity_insurance: {
      provider: String,
      policy_number: String,
      expiry_date: Date,
      coverage_amount: Number
    },
    
    // buisness experience
    years_in_business: {
      type: Number,
      min: 0
    },
    
    
    // Business Description
    business_description: {
      type: String,
      maxlength: 1000,
      trim: true,
    },
    
    // Additional Information
    languages_spoken: [String],

    awards: [String],

    testimonials: [{
      client_name: String,
      testimonial: String,
      rating: {
        type: Number,
        min: 1,
        max: 5
      },
      date: Date
    }],
    
    // Status
    is_active: {
      type: Boolean,
      default: true,
    },
    
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
businessDetailsSchema.index({ business_name: 1 });
businessDetailsSchema.index({ 'business_address.postcode': 1 });
businessDetailsSchema.index({ coverage_areas: 1 });
businessDetailsSchema.index({ services: 5 });
businessDetailsSchema.index({ specializations: 5 });
businessDetailsSchema.index({ 'property_associations.association_name': 1 });
businessDetailsSchema.index({ 'property_associations.is_active': 1 });

export default model('business_details', businessDetailsSchema);
