import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const propertyLocationSchema = new Schema(
  {
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
      unique: true,
    },
    coordinates: {
      latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
        description: 'Latitude coordinate of the property',
      },
      longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
        description: 'Longitude coordinate of the property',
      },
    },
    address_details: {
      formatted_address: {
        type: String,
        required: true,
        trim: true,
        maxlength: 500,
        description: 'Full formatted address from geocoding service',
      },
      street_number: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
      },
      route: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
      },
      locality: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        description: 'City or town',
      },
      administrative_area_level_1: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        description: 'State or region (e.g., England, Scotland)',
      },
      administrative_area_level_2: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        description: 'County or district',
      },
      country: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
        default: 'United Kingdom',
      },
      postal_code: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        match: [/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i, 'Please enter a valid UK postcode'],
      },
    },
    map_settings: {
      disable_map_display: {
        type: Boolean,
        default: false,
        description: 'Whether to disable map display on property page due to poor imagery',
      },
      map_zoom_level: {
        type: Number,
        default: 15,
        min: 1,
        max: 20,
        description: 'Default zoom level for map display',
      },
      map_type: {
        type: String,
        enum: ['roadmap', 'satellite', 'hybrid', 'terrain'],
        default: 'roadmap',
      },
    },
    geocoding_info: {
      place_id: {
        type: String,
        required: true,
        trim: true,
        description: 'Google Places API place ID',
      },
      geocoding_service: {
        type: String,
        required: true,
        enum: ['Google', 'OpenStreetMap', 'Bing', 'Manual'],
        default: 'Google',
      },
      geocoding_accuracy: {
        type: String,
        required: true,
        enum: ['ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'],
        description: 'Accuracy level of geocoding result',
      },
      geocoded_at: {
        type: Date,
        default: Date.now,
      },
    },
    location_verified: {
      type: Boolean,
      default: false,
      description: 'Whether the location has been manually verified by user',
    },
    verification_notes: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
      description: 'Notes about location verification or adjustments made',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for geospatial queries
propertyLocationSchema.index({ 'coordinates.latitude': 1, 'coordinates.longitude': 1 });
propertyLocationSchema.index({ property_id: 1 });
propertyLocationSchema.index({ 'address_details.postal_code': 1 });
propertyLocationSchema.index({ 'address_details.locality': 1 });
propertyLocationSchema.index({ 'address_details.administrative_area_level_1': 1 });

// 2dsphere index for geospatial queries
propertyLocationSchema.index({ coordinates: '2dsphere' });

// Virtual for coordinates array (for geospatial queries)
propertyLocationSchema.virtual('coordinates_array').get(function() {
  return [this.coordinates.longitude, this.coordinates.latitude];
});

// Virtual for full address
propertyLocationSchema.virtual('full_address').get(function() {
  const addr = this.address_details;
  const parts = [
    addr.street_number,
    addr.route,
    addr.locality,
    addr.administrative_area_level_2,
    addr.postal_code,
    addr.country
  ].filter(Boolean);
  return parts.join(', ');
});

// Method to calculate distance from another location
propertyLocationSchema.methods.distanceFrom = function(otherLat, otherLng) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = this.deg2rad(otherLat - this.coordinates.latitude);
  const dLng = this.deg2rad(otherLng - this.coordinates.longitude);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(this.coordinates.latitude)) * Math.cos(this.deg2rad(otherLat)) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in kilometers
  return distance;
};

propertyLocationSchema.methods.deg2rad = function(deg) {
  return deg * (Math.PI/180);
};

export default model('property_location', propertyLocationSchema);
