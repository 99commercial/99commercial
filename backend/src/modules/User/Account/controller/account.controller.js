import UserService from '../service/account.service.js';

class UserController {
  constructor() {
    this.agentService = new UserService();
  }

    // ========== USER MANAGEMENT CONTROLLERS ==========

  /**
   * Get user details by user ID from headers
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getUserDetails(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware

      const result = await this.agentService.getUserDetails(userId);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Update user details by user ID from headers
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateUserDetails(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      const userData = req.body;

      const result = await this.agentService.updateUserDetails(userId, userData);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Update business details by business details ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateBusinessDetailsById(req, res) {
    try {
      const { businessDetailsId } = req.params;
      const businessData = req.body;

      const result = await this.agentService.updateBusinessDetailsById(businessDetailsId, businessData);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Update user profile photo
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateUserProfilePhoto(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      const result = await this.agentService.updateUserProfilePhoto(userId, req.file);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      console.error('Controller error updating profile photo:', error);
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Create business details for user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createBusinessDetails(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      const businessData = req.body;

      const result = await this.agentService.createBusinessDetails(userId, businessData);

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // ========== FAVORITES MANAGEMENT CONTROLLERS ==========

  /**
   * Add property to favorites
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async addToFavorites(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      const { propertyId } = req.params;

      const result = await this.agentService.addToFavorites(userId, propertyId);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Remove property from favorites
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async removeFromFavorites(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      const { propertyId } = req.params;

      const result = await this.agentService.removeFromFavorites(userId, propertyId);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * Get user's favorite properties
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getMyFavorites(req, res) {
    try {
      const userId = req.user._id; // Get user ID from authentication middleware
      const queryParams = req.query;

      const result = await this.agentService.getMyFavorites(userId, queryParams);

      res.status(200).json({
        success: true,
        message: result.message,
        data: result.data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default UserController;