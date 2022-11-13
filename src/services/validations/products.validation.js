const { createProductSchema } = require('./schemas');

const HTTP_BAD_REQUEST = 400;
const HTTP_UNPROCESSABLE_ENTITY = 422;

const validateProductName = (name) => {
  const { error } = createProductSchema.validate({ name });

  if (!name) return { type: HTTP_BAD_REQUEST, message: error.message };
  if (error) return { type: HTTP_UNPROCESSABLE_ENTITY, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateProductName,
};