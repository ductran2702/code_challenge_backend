import Joi from 'joi';

export const createItemSchema = Joi.object({
  name: Joi.string().required().min(1).max(255).messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 1 character long',
    'string.max': 'Name cannot exceed 255 characters',
    'any.required': 'Name is required'
  }),
  description: Joi.string().optional().allow(null, '').max(1000).messages({
    'string.max': 'Description cannot exceed 1000 characters'
  })
});

export const updateItemSchema = Joi.object({
  name: Joi.string().optional().min(1).max(255).messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 1 character long',
    'string.max': 'Name cannot exceed 255 characters'
  }),
  description: Joi.string().optional().allow(null, '').max(1000).messages({
    'string.max': 'Description cannot exceed 1000 characters'
  })
}).min(1).messages({
  'object.min': 'At least one field (name or description) must be provided'
});

export const itemIdSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be a positive number',
    'any.required': 'ID is required'
  })
});

export const itemQuerySchema = Joi.object({
  name: Joi.string().optional().min(1).max(255).messages({
    'string.empty': 'Name filter cannot be empty',
    'string.min': 'Name filter must be at least 1 character long',
    'string.max': 'Name filter cannot exceed 255 characters'
  })
}); 