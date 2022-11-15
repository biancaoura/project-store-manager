const { createSaleSchema } = require('./schemas');
const { salesModel } = require('../../models');
const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST, HTTP_NOT_FOUND,
} = require('../../utils/httpStatus');

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

const validateSaleId = async (saleId) => {
  const isSaleValid = await salesModel.getSaleById(saleId);

  if (isSaleValid.length < 1) return { type: HTTP_NOT_FOUND, message: 'Sale not found' };

  return { type: null, message: isSaleValid };
};

module.exports = {
  validateSale,
  validateSaleId,
};