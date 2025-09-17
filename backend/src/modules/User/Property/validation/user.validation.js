import { body, param, query } from 'express-validator';
import mongoose from 'mongoose';

// Helper function to validate ObjectId
const isValidObjectId = (value) => {
  return mongoose.Types.ObjectId.isValid(value);
};

// Create Property Validator
export const createPropertyValidator = [
  // General Details
  body('general_details.building_name')
    .trim()
    .notEmpty()
    .withMessage('Building name is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Building name must be between 2 and 200 characters'),
  
  body('general_details.address')
    .trim()
    .notEmpty()
    .withMessage('Address is required')
    .isLength({ min: 5, max: 500 })
    .withMessage('Address must be between 5 and 500 characters'),
  
  body('general_details.country_region')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country/region must not exceed 100 characters'),
  
  body('general_details.town_city')
    .trim()
    .notEmpty()
    .withMessage('Town/City is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Town/City must be between 2 and 100 characters'),
  
  body('general_details.postcode')
    .trim()
    .notEmpty()
    .withMessage('Postcode is required')
    .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i)
    .withMessage('Please enter a valid UK postcode'),
  
  body('general_details.sale_status')
    .optional()
    .isIn(['Available', 'Under Offer', 'Sold', 'Let', 'Withdrawn'])
    .withMessage('Invalid sale status'),
  
  body('general_details.property_type')
    .notEmpty()
    .withMessage('Property type is required')
    .isIn([
      'Office', 'Retail', 'Industrial', 'Warehouse', 'Land', 'Leisure',
      'Healthcare', 'Education', 'Hotel', 'Restaurant', 'Student Accommodation',
      'Car Park', 'Data Centre', 'Other'
    ])
    .withMessage('Invalid property type'),
  
  body('general_details.property_sub_type')
    .trim()
    .notEmpty()
    .withMessage('Property sub-type is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Property sub-type must be between 2 and 100 characters'),
  
  body('general_details.max_eaves_height')
    .isNumeric()
    .withMessage('Max eaves height must be a number')
    .isFloat({ min: 0, max: 1000 })
    .withMessage('Max eaves height must be between 0 and 1000'),
  
  body('general_details.size_minimum')
    .isNumeric()
    .withMessage('Minimum size must be a number')
    .isFloat({ min: 0 })
    .withMessage('Minimum size must be greater than 0'),
  
  body('general_details.size_maximum')
    .isNumeric()
    .withMessage('Maximum size must be a number')
    .isFloat({ min: 0 })
    .withMessage('Maximum size must be greater than 0')
    .custom((value, { req }) => {
      const minSize = req.body.general_details?.size_minimum;
      if (minSize && value < minSize) {
        throw new Error('Maximum size must be greater than or equal to minimum size');
      }
      return true;
    }),
  
  body('general_details.invoice_details')
    .trim()
    .notEmpty()
    .withMessage('Invoice details are required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Invoice details must be between 10 and 500 characters'),
  
  body('general_details.property_notes')
    .trim()
    .notEmpty()
    .withMessage('Property notes are required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Property notes must be between 10 and 2000 characters'),
  
  body('general_details.approximate_year_of_construction')
    .isInt({ min: 1800, max: new Date().getFullYear() + 5 })
    .withMessage('Year of construction must be between 1800 and current year + 5'),
  
  body('general_details.expansion_capacity_percent')
    .isInt({ min: 0, max: 100 })
    .withMessage('Expansion capacity must be between 0 and 100 percent'),
  
];

// Update Property Details Validator (EPC, Council Tax, Rateable Value, Planning)
export const updatePropertyDetailsValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // EPC validation
  body('epc.rating')
    .optional()
    .isIn(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'Exempt', 'Not Required'])
    .withMessage('Invalid EPC rating'),
  
  body('epc.score')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('EPC score must be between 0 and 100'),
  
  body('epc.certificate_number')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Certificate number must not exceed 50 characters'),
  
  body('epc.expiry_date')
    .optional()
    .isISO8601()
    .withMessage('Expiry date must be a valid date'),

  // Council Tax validation
  body('council_tax.band')
    .optional()
    .isIn(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Exempt', 'Not Applicable'])
    .withMessage('Invalid council tax band'),
  
  body('council_tax.authority')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Council authority must not exceed 100 characters'),

  // Rateable Value validation
  body('rateable_value')
    .optional()
    .isNumeric()
    .withMessage('Rateable value must be a number')
    .isFloat({ min: 0 })
    .withMessage('Rateable value must be greater than or equal to 0'),

  // Planning validation
  body('planning.status')
    .optional()
    .isIn(['Full Planning', 'Outline Planning', 'No Planning Required', 'Unknown'])
    .withMessage('Invalid planning status'),
  
  body('planning.application_number')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Application number must not exceed 50 characters'),
  
  body('planning.decision_date')
    .optional()
    .isISO8601()
    .withMessage('Decision date must be a valid date'),
];

// Update Business Details Validator
export const updateBusinessDetailsValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // Business Rates validation
  body('business_rates.rateable_value_gbp')
    .optional()
    .isNumeric()
    .withMessage('Rateable value must be a number')
    .isFloat({ min: 0 })
    .withMessage('Rateable value must be greater than or equal to 0'),
  
  body('business_rates.rates_payable_gbp')
    .optional()
    .isNumeric()
    .withMessage('Rates payable must be a number')
    .isFloat({ min: 0 })
    .withMessage('Rates payable must be greater than or equal to 0'),

  // Descriptions validation
  body('descriptions.general')
    .optional()
    .trim()
    .isLength({ min: 50, max: 2000 })
    .withMessage('General description must be between 50 and 2000 characters'),
  
  body('descriptions.location')
    .optional()
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Location description must be between 20 and 1000 characters'),
  
  body('descriptions.accommodation')
    .optional()
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Accommodation description must be between 20 and 1000 characters'),
  
  body('descriptions.terms')
    .optional()
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Terms description must be between 20 and 1000 characters'),
  
  body('descriptions.specifications')
    .optional()
    .trim()
    .isLength({ min: 20, max: 1000 })
    .withMessage('Specifications description must be between 20 and 1000 characters'),

  // Sale Types validation
  body('sale_types')
    .optional()
    .isArray()
    .withMessage('Sale types must be an array'),
  
  body('sale_types.*.sale_type')
    .optional()
    .isIn(['Freehold', 'Leasehold', 'To Let', 'For Sale', 'Under Offer', 'Sold', 'Let'])
    .withMessage('Invalid sale type'),
  
  body('sale_types.*.price_currency')
    .optional()
    .isIn(['GBP'])
    .withMessage('Price currency must be GBP'),
  
  body('sale_types.*.price_value')
    .optional()
    .isNumeric()
    .withMessage('Price value must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price value must be greater than or equal to 0'),
  
  body('sale_types.*.price_unit')
    .optional()
    .isIn(['per sq ft', 'per annum', 'per month', 'per unit', 'total'])
    .withMessage('Invalid price unit'),
];

// Update Property Images Validator
export const updatePropertyImagesValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // Image captions validation (can be string or array)
  body('captions')
    .optional()
    .custom((value) => {
      if (typeof value === 'string' || Array.isArray(value)) {
        return true;
      }
      throw new Error('Captions must be a string or array');
    }),
  
  body('captions.*')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Each caption must not exceed 500 characters'),
  
  // Image types validation (can be string or array)
  body('image_types')
    .optional()
    .custom((value) => {
      if (typeof value === 'string' || Array.isArray(value)) {
        return true;
      }
      throw new Error('Image types must be a string or array');
    }),
  
  body('image_types.*')
    .optional()
    .isIn(['Photo', 'Floor Plan', 'EPC', 'Site Plan', 'Exterior', 'Interior', 'Aerial', 'Other'])
    .withMessage('Invalid image type'),
];

// Update Property Documents Validator
export const updatePropertyDocumentsValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // Document names validation
  body('document_names')
    .optional()
    .isArray()
    .withMessage('Document names must be an array'),
  
  body('document_names.*')
    .optional()
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('Each document name must be between 2 and 200 characters'),
  
  // Document types validation
  body('document_types')
    .optional()
    .isArray()
    .withMessage('Document types must be an array'),
  
  body('document_types.*')
    .optional()
    .isIn(['EPC Certificate', 'Floor Plan', 'Planning Permission', 'Title Deed', 'Survey Report', 'Other'])
    .withMessage('Invalid document type'),
  
  // Show to site users validation
  body('show_to_site_users')
    .optional()
    .isArray()
    .withMessage('Show to site users must be an array'),
  
  body('show_to_site_users.*')
    .optional()
    .isBoolean()
    .withMessage('Show to site users must be boolean values'),
];

// Update Property Location Validator
export const updatePropertyLocationValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // Coordinates validation
  body('coordinates.latitude')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  
  body('coordinates.longitude')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),

  // Address details validation
  body('address_details.formatted_address')
    .trim()
    .notEmpty()
    .withMessage('Formatted address is required')
    .isLength({ min: 10, max: 500 })
    .withMessage('Formatted address must be between 10 and 500 characters'),
  
  body('address_details.street_number')
    .optional()
    .trim()
    .isLength({ max: 20 })
    .withMessage('Street number must not exceed 20 characters'),
  
  body('address_details.route')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Route must not exceed 200 characters'),
  
  body('address_details.locality')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Locality must not exceed 100 characters'),
  
  body('address_details.administrative_area_level_1')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Administrative area level 1 must not exceed 100 characters'),
  
  body('address_details.administrative_area_level_2')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Administrative area level 2 must not exceed 100 characters'),
  
  body('address_details.country')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Country must not exceed 100 characters'),
  
  body('address_details.postal_code')
    .optional()
    .matches(/^[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}$/i)
    .withMessage('Please enter a valid UK postcode'),

  // Map settings validation
  body('map_settings.disable_map_display')
    .optional()
    .isBoolean()
    .withMessage('Disable map display must be boolean'),
  
  body('map_settings.map_zoom_level')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Map zoom level must be between 1 and 20'),
  
  body('map_settings.map_type')
    .optional()
    .isIn(['roadmap', 'satellite', 'hybrid', 'terrain'])
    .withMessage('Invalid map type'),

  // Geocoding info validation
  body('geocoding_info.place_id')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Place ID must not exceed 100 characters'),
  
  body('geocoding_info.geocoding_service')
    .optional()
    .isIn(['Google', 'OpenStreetMap', 'Bing', 'Manual'])
    .withMessage('Invalid geocoding service'),
  
  body('geocoding_info.geocoding_accuracy')
    .optional()
    .isIn(['ROOFTOP', 'RANGE_INTERPOLATED', 'GEOMETRIC_CENTER', 'APPROXIMATE'])
    .withMessage('Invalid geocoding accuracy'),
  
  body('geocoding_info.geocoded_at')
    .optional()
    .isISO8601()
    .withMessage('Geocoded at must be a valid date'),

  // Location verification validation
  body('location_verified')
    .optional()
    .isBoolean()
    .withMessage('Location verified must be boolean'),
  
  body('verification_notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Verification notes must not exceed 500 characters'),
];

// Update Property Virtual Tours Validator
export const updatePropertyVirtualToursValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  body('virtual_tours')
    .isArray({ min: 1 })
    .withMessage('At least one virtual tour is required'),
  
  body('virtual_tours.*.tour_name')
    .trim()
    .notEmpty()
    .withMessage('Tour name is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Tour name must be between 2 and 200 characters'),
  
  body('virtual_tours.*.tour_url')
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Tour URL must be a valid HTTP/HTTPS URL'),
  
  body('virtual_tours.*.link_type')
    .isIn([
      'Virtual Tour', 'Video Tour', '3D Flythrough', '360° Photos',
      'Drone Footage', 'Walkthrough Video', 'Interactive Map',
      'Floor Plan Interactive', 'Other'
    ])
    .withMessage('Invalid link type'),
  
  body('virtual_tours.*.description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  body('virtual_tours.*.thumbnail_url')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Thumbnail URL must be a valid HTTP/HTTPS URL'),
  
  body('virtual_tours.*.duration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Duration must be a positive integer'),
  
  body('virtual_tours.*.is_featured')
    .optional()
    .isBoolean()
    .withMessage('Is featured must be boolean'),
  
  body('virtual_tours.*.display_order')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),
  
  body('virtual_tours.*.is_active')
    .optional()
    .isBoolean()
    .withMessage('Is active must be boolean'),
];

// Update Property Features Validator
export const updatePropertyFeaturesValidator = [
  // Property ID validation
  param('propertyId')
    .notEmpty()
    .withMessage('Property ID is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('Invalid property ID format');
      }
      return true;
    })
    .withMessage('Property ID must be a valid MongoDB ObjectId'),

  // Main features validation
  body('features.air_conditioning')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Air conditioning must be Yes, No, or Unknown'),
  
  body('features.clean_room')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Clean room must be Yes, No, or Unknown'),
  
  body('features.craneage')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Craneage must be Yes, No, or Unknown'),
  
  body('features.laboratory')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Laboratory must be Yes, No, or Unknown'),
  
  body('features.loading_bay')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Loading bay must be Yes, No, or Unknown'),
  
  body('features.secure_yard')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Secure yard must be Yes, No, or Unknown'),
  
  body('features.yard')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Yard must be Yes, No, or Unknown'),

  // Additional features validation
  body('additional_features')
    .optional()
    .isArray()
    .withMessage('Additional features must be an array'),
  
  body('additional_features.*.feature_name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Feature name must be between 2 and 100 characters'),
  
  body('additional_features.*.feature_value')
    .optional()
    .isIn(['Yes', 'No', 'Unknown'])
    .withMessage('Feature value must be Yes, No, or Unknown'),
  
  body('additional_features.*.description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Feature description must not exceed 500 characters'),
  
  body('feature_notes')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Feature notes must not exceed 1000 characters'),
];

// ========== PROPERTY QUERY VALIDATORS ==========

// Create Property Query Validator
export const createPropertyQueryValidator = [
  param('propertyId')
    .custom(isValidObjectId)
    .withMessage('Invalid property ID'),

  body('title')
    .isIn(['MR', 'MRS', 'MS', 'MISS'])
    .withMessage('Title must be one of: MR, MRS, MS, MISS'),
  
  body('first_name')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('First name must be between 2 and 50 characters'),
  
  body('last_name')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Last name must be between 2 and 50 characters'),
  
  body('company')
    .trim()
    .notEmpty()
    .withMessage('Company is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isLength({ min: 10, max: 20 })
    .withMessage('Phone number must be between 10 and 20 characters'),
  
  body('no_of_people')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Number of people must be between 1 and 1000'),
  
  body('start_date')
    .isISO8601()
    .withMessage('Start date must be a valid date')
    .custom((value) => {
      const startDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (startDate < today) {
        throw new Error('Start date cannot be in the past');
      }
      return true;
    }),
  
  body('length_of_term')
    .trim()
    .notEmpty()
    .withMessage('Length of term is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Length of term must be between 2 and 100 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
];

// Update Query Status Validator
export const updateQueryStatusValidator = [
  param('queryId')
    .custom(isValidObjectId)
    .withMessage('Invalid query ID'),

  body('status')
    .optional()
    .isIn(['pending', 'read', 'responded', 'closed'])
    .withMessage('Status must be one of: pending, read, responded, closed'),
  
  body('agent_notes')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Agent notes must not exceed 500 characters'),
  
  body('response_message')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Response message must not exceed 1000 characters'),
];

// Get Queries by Agent ID Validator
export const getQueriesByAgentIdValidator = [
  param('agentId')
    .custom(isValidObjectId)
    .withMessage('Invalid agent ID'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('status')
    .optional()
    .isIn(['pending', 'read', 'responded', 'closed'])
    .withMessage('Invalid status filter'),
  
  query('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'first_name', 'last_name', 'company'])
    .withMessage('Invalid sort field'),
  
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
];

// Get Queries by Property ID Validator
export const getQueriesByPropertyIdValidator = [
  param('propertyId')
    .custom(isValidObjectId)
    .withMessage('Invalid property ID'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'first_name', 'last_name', 'company'])
    .withMessage('Invalid sort field'),
  
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
];

// Get Queries by User ID Validator
export const getQueriesByUserIdValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('sort_by')
    .optional()
    .isIn(['created_at', 'updated_at', 'property_id'])
    .withMessage('Invalid sort field'),
  
  query('sort_order')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be asc or desc'),
];

// Get Query by ID Validator
export const getQueryByIdValidator = [
  param('queryId')
    .custom(isValidObjectId)
    .withMessage('Invalid query ID'),
];

// Delete Query Validator
export const deleteQueryValidator = [
  param('queryId')
    .custom(isValidObjectId)
    .withMessage('Invalid query ID'),
];
