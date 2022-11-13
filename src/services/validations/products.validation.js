const { createProductSchema } = require('./schemas');

const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('../../utils/httpStatus');

const validateProductName = (name) => {
  const { error } = createProductSchema.validate({ name });

  if (!name) return { type: HTTP_BAD_REQUEST, message: error.message };
  if (error) return { type: HTTP_UNPROCESSABLE_ENTITY, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateProductName,
};