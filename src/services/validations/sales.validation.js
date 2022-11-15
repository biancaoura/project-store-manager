const { createSaleSchema } = require('./schemas');
const { salesModel } = require('../../models');
const {
  HTTP_UNPROCESSABLE_ENTITY,
  HTTP_BAD_REQUEST, HTTP_NOT_FOUND,
} = require('../../utils/httpStatus');
const { doesProductExist } = require('./sales_products.validation');

const validateSaleInput = ({ productId, quantity }) => {
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

const validateSale = (sale) => {
  let errorMessage;

  sale.map((newSale) => {
    const { type, message } = validateSaleInput(newSale);
    if (type) errorMessage = { type, message };
    return false;
  });

  if (errorMessage) return errorMessage;
  return false;
};

const validateSaleId = async (saleId) => {
  const isSaleValid = await salesModel.getSaleById(saleId);

  if (isSaleValid.length < 1) return { type: HTTP_NOT_FOUND, message: 'Sale not found' };

  return { type: null, message: isSaleValid };
};

const validateSaleUpdate = async (saleId, sale) => {
  const validSaleId = await validateSaleId(saleId);
  if (validSaleId.type) {
    return { type: validSaleId.type, message: validSaleId.message };
  }
  
  const validSale = validateSale(sale);
  if (validSale.type) {
    return { type: validSale.type, message: validSale.message };
  }

  const validProductId = await doesProductExist(sale);
  if (validProductId.type) {
    return { type: validProductId.type, message: validProductId.message };
  }
  
  return { type: null, message: '' };
};

module.exports = {
  validateSale,
  validateSaleId,
  validateSaleUpdate,
};