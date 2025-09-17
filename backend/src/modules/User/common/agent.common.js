export const ERROR_MESSAGES = {
  PROPERTY_NOT_FOUND: 'Property not found',
  UNAUTHORIZED_ACCESS: 'Unauthorized: You can only access your own properties',
  INVALID_PROPERTY_ID: 'Invalid property ID',
  VALIDATION_ERROR: 'Validation error',
  REQUIRED_FIELD_MISSING: 'Required field is missing',
  INVALID_POSTCODE: 'Please enter a valid UK postcode',
  INVALID_PROPERTY_TYPE: 'Invalid property type',
  INVALID_SALE_TYPE: 'Invalid sale type',
  INVALID_PRICE_UNIT: 'Invalid price unit',
  SIZE_VALIDATION_ERROR: 'Size minimum cannot be greater than size maximum',
  YEAR_VALIDATION_ERROR: 'Invalid year of construction',
  EXPANSION_CAPACITY_ERROR: 'Expansion capacity percent must be between 0 and 100'
};
// Success messages
export const SUCCESS_MESSAGES = {
  PROPERTY_CREATED: 'Property created successfully',
  PROPERTY_UPDATED: 'Property updated successfully',
  PROPERTY_DELETED: 'Property deleted successfully',
  PROPERTY_PERMANENTLY_DELETED: 'Property permanently deleted',
  PROPERTY_ACTIVATED: 'Property activated successfully',
  PROPERTY_DEACTIVATED: 'Property deactivated successfully',
  PROPERTY_FEATURED: 'Property featured successfully',
  PROPERTY_UNFEATURED: 'Property unfeatured successfully'
};

// Default pagination settings
export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  sortBy: 'created_at',
  sortOrder: 'desc'
}; 