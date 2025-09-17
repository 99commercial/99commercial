import User from '../../../../models/user.model.js';
import BusinessDetails from '../../../../models/business_details.model.js';

class AccountService {
  constructor() {
    this.User = User;
    this.BusinessDetails = BusinessDetails;
  }

    // ========== USER MANAGEMENT METHODS ==========

  /**
   * Get user details by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User details
   */
  async getUserDetails(userId) {
    try {
      const user = await this.User.findById(userId)
        .populate('business_details')
        .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires');

      if (!user) {
        throw new Error('User not found');
      }

      return {
        success: true,
        data: user,
        message: 'User details retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get user details: ${error.message}`);
    }
  }

  /**
   * Update user details by user ID
   * @param {string} userId - User ID
   * @param {Object} userData - User data to update
   * @returns {Promise<Object>} Updated user object
   */
  async updateUserDetails(userId, userData) {
    try {
      // Remove sensitive fields that shouldn't be updated through this endpoint
      const { password, email, role, ...allowedFields } = userData;

      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        { $set: allowedFields },
        { new: true, runValidators: true }
      ).populate('business_details')
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires');

      if (!updatedUser) {
        throw new Error('User not found');
      }

      return {
        success: true,
        data: updatedUser,
        message: 'User details updated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to update user details: ${error.message}`);
    }
  }

  /**
   * Update business details by business details ID
   * @param {string} businessDetailsId - Business details ID
   * @param {Object} businessData - Business data to update
   * @returns {Promise<Object>} Updated business details object
   */
  async updateBusinessDetailsById(businessDetailsId, businessData) {
    try {
      const updatedBusinessDetails = await this.BusinessDetails.findByIdAndUpdate(
        businessDetailsId,                // which document
        { $set: businessData },           // what to update
        { new: true, runValidators: true } // options
      );
      

      if (!updatedBusinessDetails) {
        throw new Error('Business details not found');
      }

      return {
        success: true,
        data: updatedBusinessDetails,
        message: 'Business details updated successfully'
      };
    } catch (error) {
      throw new Error(`Failed to update business details: ${error.message}`);
    }
  }

  /**
   * Update user profile photo
   * @param {string} userId - User ID
   * @param {Object} file - Uploaded file object
   * @returns {Promise<Object>} Updated user object
   */
  async updateUserProfilePhoto(userId, file) {
    try {
      if (!file || !file.path) {
        throw new Error('No file uploaded');
      }
  
      // Update user profile picture with Cloudinary URL
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        { $set: { profile_picture: file.path } }, // file.path = Cloudinary URL
        { new: true, runValidators: true }
      )
        .populate('business_details')
        .select(
          '-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires'
        );
  
      if (!updatedUser) {
        throw new Error('User not found');
      }
  
      return {
        success: true,
        data: updatedUser,
        message: 'Profile photo updated successfully',
      };
    } catch (error) {
      throw new Error(`Failed to update profile photo: ${error.message}`);
    }
  }
  

  /**
   * Create business details for user
   * @param {string} userId - User ID
   * @param {Object} businessData - Business data to create
   * @returns {Promise<Object>} Created business details and updated user object
   */
  async createBusinessDetails(userId, businessData) {
    try {
      console.log('Creating business details for user:', userId);
      console.log('Business data received:', businessData);

      // Check if user exists
      const user = await this.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if user already has business details
      if (user.business_details) {
        throw new Error('User already has business details. Use update endpoint instead.');
      }

      // Validate required fields
      if (!businessData.business_name) {
        throw new Error('Business name is required');
      }
      if (!businessData.business_type) {
        throw new Error('Business type is required');
      }
      if (!businessData.estate_agent_license) {
        throw new Error('Estate agent license is required');
      }
      if (!businessData.redress_scheme) {
        throw new Error('Redress scheme is required');
      }
      if (!businessData.business_address || !businessData.business_address.street) {
        throw new Error('Business address street is required');
      }
      if (!businessData.business_address || !businessData.business_address.city) {
        throw new Error('Business address city is required');
      }
      if (!businessData.business_address || !businessData.business_address.postcode) {
        throw new Error('Business address postcode is required');
      }
      if (!businessData.business_phone) {
        throw new Error('Business phone is required');
      }
      if (!businessData.business_email) {
        throw new Error('Business email is required');
      }

      // Validate business type specific requirements
      if ((businessData.business_type === 'limited_company' || businessData.business_type === 'llp') && !businessData.company_registration_number) {
        throw new Error('Company registration number is required for limited companies and LLPs');
      }

      // Create business details
      const businessDetails = new this.BusinessDetails(businessData);
      console.log('Business details object created:', businessDetails);
      
      const savedBusinessDetails = await businessDetails.save();
      console.log('Business details saved with ID:', savedBusinessDetails._id);

      // Update user with business details reference
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        { $set: { business_details: savedBusinessDetails._id } },
        { new: true, runValidators: true }
      ).populate('business_details')
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires');

      console.log('User updated with business details reference');

      return {
        success: true,
        data: {
          user: updatedUser,
          business_details: savedBusinessDetails
        },
        message: 'Business details created successfully'
      };
    } catch (error) {
      console.error('Error creating business details:', error);
      throw new Error(`Failed to create business details: ${error.message}`);
    }
  }

  // ========== FAVORITES MANAGEMENT METHODS ==========

  /**
   * Add property to user's favorites
   * @param {string} userId - User ID
   * @param {string} propertyId - Property ID
   * @returns {Promise<Object>} Updated user object
   */
  async addToFavorites(userId, propertyId) {
    try {
      // Check if property exists
      const property = await this.Property.findById(propertyId);
      if (!property) {
        throw new Error('Property not found');
      }

      // Check if user exists
      const user = await this.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if property is already in favorites
      if (user.my_favourites.includes(propertyId)) {
        throw new Error('Property is already in favorites');
      }

      // Add property to favorites
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        { $addToSet: { my_favourites: propertyId } },
        { new: true, runValidators: true }
      ).populate('my_favourites', 'general_details.building_name general_details.address general_details.town_city general_details.property_type images_id')
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires');

      return {
        success: true,
        data: updatedUser,
        message: 'Property added to favorites successfully'
      };
    } catch (error) {
      throw new Error(`Failed to add to favorites: ${error.message}`);
    }
  }

  /**
   * Remove property from user's favorites
   * @param {string} userId - User ID
   * @param {string} propertyId - Property ID
   * @returns {Promise<Object>} Updated user object
   */
  async removeFromFavorites(userId, propertyId) {
    try {
      // Check if user exists
      const user = await this.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Check if property is in favorites
      if (!user.my_favourites.includes(propertyId)) {
        throw new Error('Property is not in favorites');
      }

      // Remove property from favorites
      const updatedUser = await this.User.findByIdAndUpdate(
        userId,
        { $pull: { my_favourites: propertyId } },
        { new: true, runValidators: true }
      ).populate('my_favourites', 'general_details.building_name general_details.address general_details.town_city general_details.property_type images_id')
      .select('-password -emailVerificationToken -emailVerificationExpires -passwordResetToken -passwordResetExpires -emailChangeToken -emailChangeExpires');

      return {
        success: true,
        data: updatedUser,
        message: 'Property removed from favorites successfully'
      };
    } catch (error) {
      throw new Error(`Failed to remove from favorites: ${error.message}`);
    }
  }

  /**
   * Get user's favorite properties
   * @param {string} userId - User ID
   * @param {Object} queryParams - Query parameters for pagination
   * @returns {Promise<Object>} User's favorite properties
   */
  async getMyFavorites(userId, queryParams = {}) {
    try {
      const {
        page = 1,
        limit = 10,
        property_type,
        town_city,
        sort_by = 'created_at',
        sort_order = 'desc'
      } = queryParams;

      // Check if user exists
      const user = await this.User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Build filter object for favorites
      const filter = { 
        _id: { $in: user.my_favourites },
        is_active: true
      };

      // Add additional filters
      if (property_type) {
        filter['general_details.property_type'] = property_type;
      }
      
      if (town_city) {
        filter['general_details.town_city'] = new RegExp(town_city, 'i');
      }

      // Build sort object
      const sort = {};
      sort[sort_by] = sort_order === 'desc' ? -1 : 1;

      // Execute paginated query with population
      const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        populate: [
          { path: 'listed_by', select: 'first_name last_name email phone company_name' },
          { path: 'business_rates_id' },
          { path: 'descriptions_id' },
          { path: 'sale_types_id' },
          { path: 'images_id' },
          { path: 'documents_id' },
          { path: 'location_id' },
          { path: 'virtual_tours_id' },
          { path: 'features_id' }
        ]
      };

      const result = await this.Property.paginate(filter, options);

      return {
        success: true,
        data: {
          properties: result.docs,
          pagination: {
            current_page: result.page,
            total_pages: result.totalPages,
            total_documents: result.totalDocs,
            has_next_page: result.hasNextPage,
            has_prev_page: result.hasPrevPage,
            limit: result.limit
          }
        },
        message: 'Favorite properties retrieved successfully'
      };
    } catch (error) {
      throw new Error(`Failed to get favorites: ${error.message}`);
    }
  }
}

export default AccountService;