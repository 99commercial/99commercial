import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Custom validation functions for data sanitization
const validateStringField = (value) => {
  if (typeof value !== 'string') {
    throw new Error('Field must be a string');
  }
  
  // Check for JSON objects
  if (value.trim().startsWith('{') && value.trim().endsWith('}')) {
    throw new Error('JSON objects are not allowed in string fields');
  }
  
  // Check for JavaScript code patterns
  if (value.includes('function(') || value.includes('=>') || value.includes('var ') || 
      value.includes('let ') || value.includes('const ') || value.includes('if(') || 
      value.includes('for(') || value.includes('while(')) {
    throw new Error('JavaScript code is not allowed in string fields');
  }
  
  // Check for HTML tags
  if (/<[^>]*>/g.test(value)) {
    throw new Error('HTML tags are not allowed in string fields');
  }
  
  // Check for SQL injection patterns
  if (value.toLowerCase().includes('select ') || value.toLowerCase().includes('insert ') || 
      value.toLowerCase().includes('update ') || value.toLowerCase().includes('delete ') ||
      value.toLowerCase().includes('drop ') || value.toLowerCase().includes('union ')) {
    throw new Error('SQL injection patterns are not allowed');
  }
  
  // Check for script tags
  if (value.toLowerCase().includes('<script') || value.toLowerCase().includes('</script>')) {
    throw new Error('Script tags are not allowed');
  }
  
  return true;
};

const sanitizeString = (value) => {
  if (typeof value !== 'string') {
    return value;
  }
  
  // Remove any potential HTML tags
  let sanitized = value.replace(/<[^>]*>/g, '');
  
  // Remove any potential script content
  sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
};

const validateEmail = (value) => {
  if (typeof value !== 'string') {
    throw new Error('Email must be a string');
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    throw new Error('Invalid email format');
  }
  
  // Check for inappropriate content in email
  validateStringField(value);
  
  return true;
};

const validatePhone = (value) => {
  if (typeof value !== 'string') {
    throw new Error('Phone must be a string');
  }
  
  // Remove all non-digit characters for validation
  const digitsOnly = value.replace(/\D/g, '');
  
  // Check if it contains only digits and common phone characters
  if (!/^[\d\s\-\+\(\)]+$/.test(value)) {
    throw new Error('Phone number contains invalid characters');
  }
  
  // Check for minimum length (at least 10 digits)
  if (digitsOnly.length < 10) {
    throw new Error('Phone number must be at least 10 digits');
  }
  
  // Check for inappropriate content
  validateStringField(value);
  
  return true;
};

// Property query schema for contact form submissions
const propertyQuerySchema = new Schema(
  {
    // Reference to the property being queried about
    property_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'property',
      required: true,
      index: true,
    },

    // Reference to the agent/company handling the query
    agent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      index: true,
    },

    // Reference to the user who raises the query
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      index: true,
    },

    // Contact form details
    title: {
      type: String,
      enum: ['MR', 'MRS', 'MS', 'MISS'],
      required: true,
    },

    first_name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validateStringField,
        message: 'First name contains inappropriate content'
      },
      set: sanitizeString,
      maxlength: [50, 'First name cannot exceed 50 characters']
    },

    last_name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validateStringField,
        message: 'Last name contains inappropriate content'
      },
      set: sanitizeString,
      maxlength: [50, 'Last name cannot exceed 50 characters']
    },

    company: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validateStringField,
        message: 'Company name contains inappropriate content'
      },
      set: sanitizeString,
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: validateEmail,
        message: 'Email contains inappropriate content or invalid format'
      },
      set: sanitizeString,
      maxlength: [100, 'Email cannot exceed 100 characters']
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validatePhone,
        message: 'Phone number contains inappropriate content or invalid format'
      },
      set: sanitizeString,
      maxlength: [20, 'Phone number cannot exceed 20 characters']
    },

    no_of_people: {
      type: Number,
      required: true,
      min: [1, 'Number of people must be at least 1'],
      max: [1000, 'Number of people cannot exceed 1000'],
      validate: {
        validator: function(value) {
          return Number.isInteger(value) && value > 0;
        },
        message: 'Number of people must be a positive integer'
      }
    },

    start_date: {
      type: Date,
      required: true,
    },

    length_of_term: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validateStringField,
        message: 'Length of term contains inappropriate content'
      },
      set: sanitizeString,
      maxlength: [50, 'Length of term cannot exceed 50 characters']
    },

    message: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: validateStringField,
        message: 'Message contains inappropriate content'
      },
      set: sanitizeString,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },

    // Soft delete
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware for additional validation
propertyQuerySchema.pre('save', function(next) {
  // Validate start_date is not in the past
  if (this.start_date && this.start_date < new Date()) {
    return next(new Error('Start date cannot be in the past'));
  }
  
  // Additional validation for ObjectId fields
  if (!mongoose.Types.ObjectId.isValid(this.property_id)) {
    return next(new Error('Invalid property ID format'));
  }
  
  if (!mongoose.Types.ObjectId.isValid(this.agent_id)) {
    return next(new Error('Invalid agent ID format'));
  }
  
  if (!mongoose.Types.ObjectId.isValid(this.user_id)) {
    return next(new Error('Invalid user ID format'));
  }
  
  next();
});

// Pre-update middleware for additional validation
propertyQuerySchema.pre(['updateOne', 'findOneAndUpdate'], function(next) {
  const update = this.getUpdate();
  
  // Validate string fields in updates
  const stringFields = ['first_name', 'last_name', 'company', 'email', 'phone', 'length_of_term', 'message'];
  
  for (const field of stringFields) {
    if (update[field] !== undefined) {
      try {
        validateStringField(update[field]);
      } catch (error) {
        return next(new Error(`${field}: ${error.message}`));
      }
    }
  }
  
  // Validate email specifically
  if (update.email !== undefined) {
    try {
      validateEmail(update.email);
    } catch (error) {
      return next(new Error(`email: ${error.message}`));
    }
  }
  
  // Validate phone specifically
  if (update.phone !== undefined) {
    try {
      validatePhone(update.phone);
    } catch (error) {
      return next(new Error(`phone: ${error.message}`));
    }
  }
  
  next();
});

export default model('property_query', propertyQuerySchema);
