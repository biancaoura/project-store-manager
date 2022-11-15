const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const createSaleSchema = Joi.object({
  productId: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  createProductSchema,
  createSaleSchema,
  updateProductSchema,
};