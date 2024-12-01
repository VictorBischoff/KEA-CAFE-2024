const Joi = require('joi');

const userValidation = {
  register: Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .required()
      .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 50 characters',
        'any.required': 'Username is required'
      }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.pattern.base': 'Password must contain at least one uppercase letter, one number, and one special character',
        'any.required': 'Password is required'
      })
  }),

  login: Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  updateProfile: Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 50 characters'
      }),
    email: Joi.string()
      .email()
      .messages({
        'string.email': 'Please provide a valid email address'
      })
  }),

  updateUser: Joi.object({
    username: Joi.string()
      .min(3)
      .max(50)
      .messages({
        'string.min': 'Username must be at least 3 characters long',
        'string.max': 'Username cannot exceed 50 characters'
      }),
    email: Joi.string()
      .email()
      .messages({
        'string.email': 'Please provide a valid email address'
      }),
    role: Joi.string()
      .valid('user', 'admin')
      .messages({
        'any.only': 'Invalid role value'
      }),
    isActive: Joi.boolean()
  }),

  changePassword: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
  }),

  forgotPassword: Joi.object({
    email: Joi.string().email().required()
  }),

  resetPassword: Joi.object({
    token: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
      .required()
  })
};

const cafeValidation = {
  create: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        'any.required': 'Cafe name is required'
      }),
    description: Joi.string()
      .max(1000)
      .messages({
        'string.max': 'Description cannot exceed 1000 characters'
      }),
    address: Joi.string()
      .required()
      .messages({
        'any.required': 'Address is required'
      }),
    city: Joi.string()
      .required()
      .messages({
        'any.required': 'City is required'
      }),
    postalCode: Joi.string(),
    country: Joi.string()
      .required()
      .messages({
        'any.required': 'Country is required'
      }),
    phone: Joi.string()
      .pattern(/^\+?[\d\s-]+$/)
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    email: Joi.string()
      .email()
      .messages({
        'string.email': 'Please provide a valid email address'
      }),
    website: Joi.string()
      .uri()
      .messages({
        'string.uri': 'Please provide a valid website URL'
      }),
    latitude: Joi.number()
      .min(-90)
      .max(90)
      .messages({
        'number.min': 'Invalid latitude value',
        'number.max': 'Invalid latitude value'
      }),
    longitude: Joi.number()
      .min(-180)
      .max(180)
      .messages({
        'number.min': 'Invalid longitude value',
        'number.max': 'Invalid longitude value'
      }),
    priceRange: Joi.string()
      .valid('$', '$$', '$$$', '$$$$')
      .messages({
        'any.only': 'Invalid price range value'
      })
  }),

  update: Joi.object({
    name: Joi.string(),
    description: Joi.string().max(1000),
    address: Joi.string(),
    city: Joi.string(),
    postalCode: Joi.string(),
    country: Joi.string(),
    phone: Joi.string().pattern(/^\+?[\d\s-]+$/),
    email: Joi.string().email(),
    website: Joi.string().uri(),
    latitude: Joi.number().min(-90).max(90),
    longitude: Joi.number().min(-180).max(180),
    priceRange: Joi.string().valid('$', '$$', '$$$', '$$$$')
  }),

  amenities: Joi.object({
    amenityIds: Joi.array()
      .items(Joi.number().positive())
      .required()
      .messages({
        'array.base': 'Amenities must be an array',
        'any.required': 'Amenities are required'
      })
  })
};

const reviewValidation = {
  create: Joi.object({
    rating: Joi.number()
      .min(1)
      .max(5)
      .required()
      .messages({
        'number.min': 'Rating must be between 1 and 5',
        'number.max': 'Rating must be between 1 and 5',
        'any.required': 'Rating is required'
      }),
    content: Joi.string()
      .max(500)
      .messages({
        'string.max': 'Review content cannot exceed 500 characters'
      }),
    noise_level: Joi.string()
      .valid('quiet', 'moderate', 'loud')
      .required()
      .messages({
        'any.only': 'Invalid noise level value',
        'any.required': 'Noise level is required'
      }),
    wifi_quality: Joi.number()
      .min(1)
      .max(5)
      .messages({
        'number.min': 'WiFi quality must be between 1 and 5',
        'number.max': 'WiFi quality must be between 1 and 5'
      }),
    power_outlets: Joi.string()
      .valid('none', 'limited', 'plenty')
      .messages({
        'any.only': 'Invalid power outlets value'
      })
  }),

  update: Joi.object({
    rating: Joi.number().min(1).max(5),
    content: Joi.string().max(500),
    noise_level: Joi.string().valid('quiet', 'moderate', 'loud'),
    wifi_quality: Joi.number().min(1).max(5),
    power_outlets: Joi.string().valid('none', 'limited', 'plenty')
  })
};

module.exports = {
  userValidation,
  cafeValidation,
  reviewValidation
};