const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  createProductSchema,
};