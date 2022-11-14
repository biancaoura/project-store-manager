const { createSaleSchema } = require('./schemas');
const { HTTP_UNPROCESSABLE_ENTITY, HTTP_BAD_REQUEST } = require('../../utils/httpStatus');

const validateSale = ({ productId, quantity }) => {
  const { error } = createSaleSchema.validate({ productId, quantity });

  if (!productId || !quantity) {
    const type = error.message.includes('required')
      ? HTTP_BAD_REQUEST
      : HTTP_UNPROCESSABLE_ENTITY;
    return { type, message: error.message };
  }

  if (error) return { type: HTTP_UNPROCESSABLE_ENTITY, message: error.message };

  return { type: null, message: '' };
};

module.exports = {
  validateSale,
};