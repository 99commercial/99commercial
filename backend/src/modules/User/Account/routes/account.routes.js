import express from 'express';
import AgentController from '../controller/account.controller.js';
import { authenticate } from '../../../../middleware/authenticate.middleware.js';
import { authorize } from '../../../../middleware/authorize.middleware.js';
import upload from '../../../../config/cloudinary.config.js';

const router = express.Router();
const agentController = new AgentController();


// ========== USER ACCOUNT MANAGEMENT ROUTES ==========

// Get user details (user ID from headers)
router.get('/users/profile', 
    authenticate,
    authorize(['user']),
    agentController.getUserDetails.bind(agentController)
  );
  
  // Update user details (user ID from headers)
  router.put('/users/profile', 
    authenticate,
    authorize(['user']),
    agentController.updateUserDetails.bind(agentController)
  );
  
  // Update user profile photo (user ID from headers)
  router.put('/users/profile/photo', 
    authenticate,
    authorize(['user']),
    upload.single('profile_photo'),
    agentController.updateUserProfilePhoto.bind(agentController)
  );
  
  // Create business details for user (user ID from headers)
  router.post('/users/business-details', 
    authenticate,
    authorize(['user']),
    agentController.createBusinessDetails.bind(agentController)
  );
  
  // Update business details by business details ID
  router.put('/business-details/:businessDetailsId', 
    authenticate,
    authorize(['user']),
    agentController.updateBusinessDetailsById.bind(agentController)
  );
  
  // ========== FAVORITES MANAGEMENT ROUTES ==========
  
  // Add property to favorites
  router.post('/favorites/:propertyId', 
    authenticate,
    authorize(['user']),
    agentController.addToFavorites.bind(agentController)
  );
  
  // Remove property from favorites
  router.delete('/favorites/:propertyId', 
    authenticate,
    authorize(['user']),
    agentController.removeFromFavorites.bind(agentController)
  );
  
  // Get user's favorite properties
  router.get('/favorites', 
    authenticate,
    authorize(['user']),
    agentController.getMyFavorites.bind(agentController)
  );

  export default router;