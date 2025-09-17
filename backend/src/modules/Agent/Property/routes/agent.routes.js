import express from 'express';
import AgentController from '../controller/agent.controller.js';
import { authenticate } from '../../../../middleware/authenticate.middleware.js';
import { authorize } from '../../../../middleware/authorize.middleware.js';
import upload from '../../../../config/cloudinary.config.js';
import { 
  createPropertyValidator,
  updatePropertyDetailsValidator,
  updateBusinessDetailsValidator,
  // updatePropertyImagesValidator,
  // updatePropertyDocumentsValidator,
  updatePropertyLocationValidator,
  updatePropertyVirtualToursValidator,
  updatePropertyFeaturesValidator,
  // updatePropertyGeneralDetailsValidator,
  // updatePropertyEPCValidator,
  // updatePropertyCouncilTaxValidator,
  // updatePropertyRateableValueValidator,
  // updatePropertyPlanningValidator,
  // updatePropertyStatusValidator,
  // updatePropertySEOValidator,
  // updateBusinessRatesByIdValidator,
  // updateDescriptionsByIdValidator,
  // updateSaleTypesByIdValidator,
  // updatePropertyImagesByIdValidator,
  // updatePropertyDocumentsByIdValidator,
  // updatePropertyLocationByIdValidator,
  // updatePropertyVirtualToursByIdValidator,
  // updatePropertyFeaturesByIdValidator,
  createPropertyQueryValidator,
  updateQueryStatusValidator,
  getQueriesByAgentIdValidator,
  getQueriesByPropertyIdValidator,
  getQueriesByUserIdValidator,
  getQueryByIdValidator,
  deleteQueryValidator
} from '../validation/agent.validation.js';
import { validateRequest } from '../../../../middleware/error.middleware.js';

const router = express.Router();
const agentController = new AgentController();

// Property CRUD routes (Agent only)
router.post('/properties', 
  authenticate,
  createPropertyValidator,
  validateRequest,
  agentController.createProperty.bind(agentController)
);

// Create business details (business_rates, descriptions, sale_types)
router.put('/properties/:propertyId/business-details', 
  authenticate,
  updateBusinessDetailsValidator,
  validateRequest,
  agentController.updateBusinessDetails.bind(agentController)
);

// Create property details (epc, council_tax, rateable_value, planning)
router.put('/properties/:propertyId/property-details', 
  authenticate,
  updatePropertyDetailsValidator,
  validateRequest,
  agentController.updatePropertyDetails.bind(agentController)
);

// // Create property images
// router.put('/properties/:propertyId/images', 
//   authenticate,
//   updatePropertyImagesValidator,
//   validateRequest,
//   uploadImages.array('files', 10),
//   agentController.updatePropertyImages.bind(agentController)
// );

// // Create property documents
// router.put('/properties/:propertyId/documents', 
//   authenticate,
//   updatePropertyDocumentsValidator,
//   validateRequest,
//   uploadDocuments.array('files', 5),
//   agentController.updatePropertyDocuments.bind(agentController)
// );

// Create property location
router.put('/properties/:propertyId/location', 
  authenticate,
  updatePropertyLocationValidator,
  validateRequest,
  agentController.updatePropertyLocation.bind(agentController)
);

// Create property virtual tours
router.put('/properties/:propertyId/virtual-tours', 
  authenticate,
  updatePropertyVirtualToursValidator,
  validateRequest,
  agentController.updatePropertyVirtualTours.bind(agentController)
);

// Create property features
router.put('/properties/:propertyId/features', 
  authenticate,
  updatePropertyFeaturesValidator,
  validateRequest,
  agentController.updatePropertyFeatures.bind(agentController)
);

// Get all properties (public access)
router.get('/properties/all', 
  agentController.getAllProperties.bind(agentController)
);

// Get properties by agent ID
router.get('/agents/:agentId/properties', 
  agentController.getPropertiesByAgentId.bind(agentController)
);

// Get property by ID (public access)
router.get('/properties/:propertyId', 
  agentController.getPropertyById.bind(agentController)
);

// ========== PROPERTY SECTION UPDATE ROUTES ==========

// Update property general details
router.patch('/properties/:propertyId/general-details', 
  authenticate,
  agentController.updatePropertyGeneralDetails.bind(agentController)
);

// Update property EPC details
// router.patch('/properties/:propertyId/epc', 
//   authenticate,
//   updatePropertyEPCValidator,
//   validateRequest,
//   agentController.updatePropertyEPC.bind(agentController)
// );

// // Update property council tax details
// router.patch('/properties/:propertyId/council-tax', 
//   authenticate,
//   updatePropertyCouncilTaxValidator,
//   validateRequest,
//   agentController.updatePropertyCouncilTax.bind(agentController)
// );

// // Update property rateable value
// router.patch('/properties/:propertyId/rateable-value', 
//   authenticate,
//   updatePropertyRateableValueValidator,
//   validateRequest,
//   agentController.updatePropertyRateableValue.bind(agentController)
// );

// // Update property planning details
// router.patch('/properties/:propertyId/planning', 
//   authenticate,
//   updatePropertyPlanningValidator,
//   validateRequest,
//   agentController.updatePropertyPlanning.bind(agentController)
// );

// // Update property status
// router.patch('/properties/:propertyId/status', 
//   authenticate,
//   updatePropertyStatusValidator,
//   validateRequest,
//   agentController.updatePropertyStatus.bind(agentController)
// );

// // Update property SEO fields
// router.patch('/properties/:propertyId/seo', 
//   authenticate,
//   updatePropertySEOValidator,
//   validateRequest,
//   agentController.updatePropertySEO.bind(agentController)
// );

// ========== REFERENCE ID UPDATE ROUTES ==========

// Update business rates by reference ID
router.patch('/business-rates/:businessRatesId', 
  authenticate,
  agentController.updateBusinessRatesById.bind(agentController)
);

// Update descriptions by reference ID
router.patch('/descriptions/:descriptionsId', 
  authenticate,
  agentController.updateDescriptionsById.bind(agentController)
);

// Update sale types by reference ID
router.patch('/sale-types/:saleTypesId', 
  authenticate,
  agentController.updateSaleTypesById.bind(agentController)
);

// // Update property images by reference ID
// router.patch('/property-images/:imagesId', 
//   authenticate,
//   updatePropertyImagesByIdValidator,
//   validateRequest,
//   agentController.updatePropertyImagesById.bind(agentController)
// );

// // Update property documents by reference ID
// router.patch('/property-documents/:documentsId', 
//   authenticate,
//   updatePropertyDocumentsByIdValidator,
//   validateRequest,
//   agentController.updatePropertyDocumentsById.bind(agentController)
// );

// Update property location by reference ID
router.patch('/property-location/:locationId', 
  authenticate,
  agentController.updatePropertyLocationById.bind(agentController)
);

// Update property virtual tours by reference ID
router.patch('/property-virtual-tours/:virtualToursId', 
  authenticate,
  agentController.updatePropertyVirtualToursById.bind(agentController)
);

// Update property features by reference ID
router.patch('/property-features/:featuresId', 
  authenticate,
  agentController.updatePropertyFeaturesById.bind(agentController)
);

// ========== PROPERTY QUERY ROUTES ==========

// Create property query
router.post('/properties/:propertyId/queries', 
  authenticate,
  createPropertyQueryValidator,
  validateRequest,
  agentController.createPropertyQuery.bind(agentController)
);

// Get queries by agent ID
router.get('/agents/:agentId/queries', 
  authenticate,
  getQueriesByAgentIdValidator,
  validateRequest,
  agentController.getQueriesByAgentId.bind(agentController)
);

// Get queries by property ID
router.get('/properties/:propertyId/queries', 
  authenticate,
  getQueriesByPropertyIdValidator,
  validateRequest,
  agentController.getQueriesByPropertyId.bind(agentController)
);

// Get queries created by user (my queries)
router.get('/queries/my-queries', 
  authenticate,
  getQueriesByUserIdValidator,
  validateRequest,
  agentController.getQueriesByUserId.bind(agentController)
);

// Get single query by ID
router.get('/queries/:queryId', 
  authenticate,
  getQueryByIdValidator,
  validateRequest,
  agentController.getQueryById.bind(agentController)
);

// Update query status
router.put('/queries/:queryId/status', 
  authenticate,
  updateQueryStatusValidator,
  validateRequest,
  agentController.updateQueryStatus.bind(agentController)
);

// Delete query
router.delete('/queries/:queryId', 
  authenticate,
  deleteQueryValidator,
  validateRequest,
  agentController.deleteQuery.bind(agentController)
);

export default router;
