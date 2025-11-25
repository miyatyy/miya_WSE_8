const Joi = require('joi');

const createArticle = Joi.object({
  title: Joi.string().min(5).max(200).required(),
  content: Joi.string().min(20).required(),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('draft','published').optional()
});

const updateArticle = Joi.object({
  title: Joi.string().min(5).max(200).optional(),
  content: Joi.string().min(20).optional(),
  tags: Joi.array().items(Joi.string()).optional(),
  status: Joi.string().valid('draft','published').optional()
});

module.exports = { createArticle, updateArticle };
