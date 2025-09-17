import AgentService from '../service/agent.service.js';

class AgentController {
  constructor() {
    this.agentService = new AgentService();
  }

  /**
   * Create a new property
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createProperty(req, res) {
    try {
      const agentId = req.user._id; // Assuming user ID is available from auth middleware
      const propertyData = req.body;

      const result = await this.agentService.createProperty(propertyData, agentId);

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

    /**
   * Update business details (business_rates, descriptions, sale_types)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
    async updateBusinessDetails(req, res) {
      try {
        console.log('Controller updateBusinessDetails called');
        const { propertyId } = req.params;
        const { business_rates, descriptions, sale_types } = req.body;
  
        const result = await this.agentService.updateBusinessDetails(propertyId, {
          business_rates,
          descriptions,
          sale_types
        });
  
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
   * Update property details (epc, council_tax, rateable_value, planning)
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyDetails(req, res) {
      try {
        const { propertyId } = req.params;
        const { epc, council_tax, rateable_value, planning } = req.body;
  
        const result = await this.agentService.updatePropertyDetails(propertyId, {
          epc,
          council_tax,
          rateable_value,
          planning
        });
  
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

  // /**
  //  * Update property images
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyImages(req, res) {
  //   try {
  //     console.log('Controller updatePropertyImages called');
  //     const { propertyId } = req.params;
      
  //     // Parse form data arrays
  //     const captions = req.body.captions ? 
  //       (Array.isArray(req.body.captions) ? req.body.captions : [req.body.captions]) : [];
  //     const image_types = req.body.image_types ? 
  //       (Array.isArray(req.body.image_types) ? req.body.image_types : [req.body.image_types]) : [];

  //     const imagesData = {
  //       files: req.files || [],
  //       captions,
  //       image_types
  //     };

  //     console.log('Request data:', {
  //       propertyId,
  //       files: req.files ? req.files.length : 0,
  //       captions,
  //       image_types,
  //       body: req.body
  //     });

  //     const result = await this.agentService.updatePropertyImages(propertyId, imagesData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     console.error('Error in updatePropertyImages controller:', error);
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property documents
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyDocuments(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const documentsData = {
  //       ...req.body,
  //       files: req.files || []
  //     };

  //     const result = await this.agentService.updatePropertyDocuments(propertyId, documentsData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  /**
   * Update property location
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyLocation(req, res) {
    try {
      const { propertyId } = req.params;
      const locationData = req.body;

      const result = await this.agentService.updatePropertyLocation(propertyId, locationData);

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
   * Update property virtual tours
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyVirtualTours(req, res) {
    try {
      const { propertyId } = req.params;
      const virtualToursData = req.body;

      const result = await this.agentService.updatePropertyVirtualTours(propertyId, virtualToursData);

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
   * Update property features
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyFeatures(req, res) {
    try {
      const { propertyId } = req.params;
      const featuresData = req.body;

      const result = await this.agentService.updatePropertyFeatures(propertyId, featuresData);

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
   * Get all properties with pagination and filtering
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getAllProperties(req, res) {
    try {
      const queryParams = req.query;
      const result = await this.agentService.getAllProperties(queryParams);

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
   * Get properties by agent ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getPropertiesByAgentId(req, res) {
    try {
      const { agentId } = req.params;
      const queryParams = req.query;
      
      const result = await this.agentService.getPropertiesByAgentId(agentId, queryParams);

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
   * Get property by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getPropertyById(req, res) {
    try {
      const { propertyId } = req.params;
      
      const result = await this.agentService.getPropertyById(propertyId);

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

  // ========== PROPERTY SECTION UPDATE CONTROLLERS ==========

  /**
   * Update property general details
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyGeneralDetails(req, res) {
    try {
      const { propertyId } = req.params;
      const generalDetails = req.body;

      const result = await this.agentService.updatePropertyGeneralDetails(propertyId, generalDetails);

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

  // /**
  //  * Update property EPC details
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyEPC(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const epcData = req.body;

  //     const result = await this.agentService.updatePropertyEPC(propertyId, epcData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property council tax details
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyCouncilTax(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const councilTaxData = req.body;

  //     const result = await this.agentService.updatePropertyCouncilTax(propertyId, councilTaxData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property rateable value
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyRateableValue(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const { rateable_value } = req.body;

  //     const result = await this.agentService.updatePropertyRateableValue(propertyId, rateable_value);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property planning details
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyPlanning(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const planningData = req.body;

  //     const result = await this.agentService.updatePropertyPlanning(propertyId, planningData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property status
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertyStatus(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const statusData = req.body;

  //     const result = await this.agentService.updatePropertyStatus(propertyId, statusData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // /**
  //  * Update property SEO fields
  //  * @param {Object} req - Express request object
  //  * @param {Object} res - Express response object
  //  */
  // async updatePropertySEO(req, res) {
  //   try {
  //     const { propertyId } = req.params;
  //     const seoData = req.body;

  //     const result = await this.agentService.updatePropertySEO(propertyId, seoData);

  //     res.status(200).json({
  //       success: true,
  //       message: result.message,
  //       data: result.data
  //     });
  //   } catch (error) {
  //     res.status(400).json({
  //       success: false,
  //       message: error.message
  //     });
  //   }
  // }

  // ========== REFERENCE ID UPDATE CONTROLLERS ==========

  /**
   * Update business rates by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateBusinessRatesById(req, res) {
    try {
      const { businessRatesId } = req.params;
      const businessRatesData = req.body;

      const result = await this.agentService.updateBusinessRatesById(businessRatesId, businessRatesData);

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
   * Update descriptions by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateDescriptionsById(req, res) {
    try {
      const { descriptionsId } = req.params;
      const descriptionsData = req.body;

      const result = await this.agentService.updateDescriptionsById(descriptionsId, descriptionsData);

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
   * Update sale types by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateSaleTypesById(req, res) {
    try {
      const { saleTypesId } = req.params;
      const saleTypesData = req.body;

      const result = await this.agentService.updateSaleTypesById(saleTypesId, saleTypesData);

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
   * Update property images by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyImagesById(req, res) {
    try {
      const { imagesId } = req.params;
      const imagesData = req.body;

      const result = await this.agentService.updatePropertyImagesById(imagesId, imagesData);

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
   * Update property documents by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyDocumentsById(req, res) {
    try {
      const { documentsId } = req.params;
      const documentsData = req.body;

      const result = await this.agentService.updatePropertyDocumentsById(documentsId, documentsData);

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
   * Update property location by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyLocationById(req, res) {
    try {
      const { locationId } = req.params;
      const locationData = req.body;

      const result = await this.agentService.updatePropertyLocationById(locationId, locationData);

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
   * Update property virtual tours by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyVirtualToursById(req, res) {
    try {
      const { virtualToursId } = req.params;
      const virtualToursData = req.body;

      const result = await this.agentService.updatePropertyVirtualToursById(virtualToursId, virtualToursData);

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
   * Update property features by reference ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updatePropertyFeaturesById(req, res) {
    try {
      const { featuresId } = req.params;
      const featuresData = req.body;

      const result = await this.agentService.updatePropertyFeaturesById(featuresId, featuresData);

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

  // ========== PROPERTY QUERY CONTROLLERS ==========

  /**
   * Create a property query
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async createPropertyQuery(req, res) {
    try {
      const { propertyId } = req.params;
      const queryData = req.body;
      const userId = req.user._id; // User ID from authentication middleware

      const result = await this.agentService.createPropertyQuery(queryData, propertyId, null, userId);

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

  /**
   * Get queries by agent ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getQueriesByAgentId(req, res) {
    try {
      const { agentId } = req.params;
      const queryParams = req.query;

      const result = await this.agentService.getQueriesByAgentId(agentId, queryParams);

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
   * Get queries by property ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getQueriesByPropertyId(req, res) {
    try {
      const { propertyId } = req.params;
      const queryParams = req.query;

      const result = await this.agentService.getQueriesByPropertyId(propertyId, queryParams);

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
   * Get queries created by user
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getQueriesByUserId(req, res) {
    try {
      const userId = req.user._id; // User ID from authentication middleware
      const queryParams = req.query;

      const result = await this.agentService.getQueriesByUserId(userId, queryParams);

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
   * Get single query by ID
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async getQueryById(req, res) {
    try {
      const { queryId } = req.params;

      const result = await this.agentService.getQueryById(queryId);

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
   * Update query status
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async updateQueryStatus(req, res) {
    try {
      const { queryId } = req.params;
      const updateData = req.body;

      const result = await this.agentService.updateQueryStatus(queryId, updateData);

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
   * Delete query
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   */
  async deleteQuery(req, res) {
    try {
      const { queryId } = req.params;

      const result = await this.agentService.deleteQuery(queryId);

      res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

export default AgentController;
