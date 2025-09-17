import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertyFeaturesSchema = new Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
      unique: true,
    },
    features: {
      air_conditioning: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Air conditioning availability',
      },
      clean_room: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Clean room facilities',
      },
      craneage: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Craneage facilities',
      },
      laboratory: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Laboratory facilities',
      },
      loading_bay: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Loading bay availability',
      },
      secure_yard: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Secure yard availability',
      },
      yard: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        default: 'Unknown',
        description: 'Yard availability',
      },
    },
    additional_features: [{
      feature_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
      },
      feature_value: {
        type: String,
        enum: ['Yes', 'No', 'Unknown'],
        required: true,
        default: 'Unknown',
      },
      description: {
        type: String,
        trim: true,
        maxlength: 500,
      },
    }],
    feature_notes: {
      type: String,
      trim: true,
      maxlength: 1000,
      description: 'Additional notes about property features',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
propertyFeaturesSchema.index({ property_id: 1 });
propertyFeaturesSchema.index({ 'features.air_conditioning': 1 });
propertyFeaturesSchema.index({ 'features.loading_bay': 1 });
propertyFeaturesSchema.index({ 'features.secure_yard': 1 });

// Virtual for confirmed features (Yes)
propertyFeaturesSchema.virtual('confirmed_features').get(function() {
  const confirmed = [];
  const features = this.features;
  
  Object.keys(features).forEach(key => {
    if (features[key] === 'Yes') {
      confirmed.push({
        feature: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: features[key]
      });
    }
  });
  
  // Add additional features
  this.additional_features.forEach(feature => {
    if (feature.feature_value === 'Yes') {
      confirmed.push({
        feature: feature.feature_name,
        value: feature.feature_value,
        description: feature.description
      });
    }
  });
  
  return confirmed;
});

// Virtual for unknown features
propertyFeaturesSchema.virtual('unknown_features').get(function() {
  const unknown = [];
  const features = this.features;
  
  Object.keys(features).forEach(key => {
    if (features[key] === 'Unknown') {
      unknown.push({
        feature: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        value: features[key]
      });
    }
  });
  
  // Add additional features
  this.additional_features.forEach(feature => {
    if (feature.feature_value === 'Unknown') {
      unknown.push({
        feature: feature.feature_name,
        value: feature.feature_value,
        description: feature.description
      });
    }
  });
  
  return unknown;
});

// Method to update a feature
propertyFeaturesSchema.methods.updateFeature = function(featureName, value) {
  if (this.features.hasOwnProperty(featureName)) {
    this.features[featureName] = value;
  } else {
    // Add to additional features
    const existingFeature = this.additional_features.find(f => f.feature_name === featureName);
    if (existingFeature) {
      existingFeature.feature_value = value;
    } else {
      this.additional_features.push({
        feature_name: featureName,
        feature_value: value
      });
    }
  }
  return this.save();
};

// Method to get feature summary
propertyFeaturesSchema.methods.getFeatureSummary = function() {
  const summary = {
    total: 0,
    confirmed: 0,
    unavailable: 0,
    unknown: 0
  };
  
  // Count main features
  Object.values(this.features).forEach(value => {
    summary.total++;
    if (value === 'Yes') summary.confirmed++;
    else if (value === 'No') summary.unavailable++;
    else summary.unknown++;
  });
  
  // Count additional features
  this.additional_features.forEach(feature => {
    summary.total++;
    if (feature.feature_value === 'Yes') summary.confirmed++;
    else if (feature.feature_value === 'No') summary.unavailable++;
    else summary.unknown++;
  });
  
  return summary;
};

export default model('property_features', propertyFeaturesSchema);
