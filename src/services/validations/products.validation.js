const { createProductSchema, updateProductSchema } = require('./schemas');

const httpStatus = require('../../utils/httpStatus');
const { productsModel } = require('../../models');

const validateProductName = (name) => {
  const { error } = createProductSchema.validate({ name });

  if (!name) return { type: httpStatus.BAD_REQUEST, message: error.message };
  if (error) return { type: httpStatus.UNPROCESSABLE_ENTITY, message: error.message };

  return { type: null, message: '' };
};

const doesProductExist = async (productId) => {
  const validation = await productsModel.getProductById(productId);

  if (!validation) return { type: httpStatus.NOT_FOUND, message: 'Product not found' };

  return { type: null, message: '' };
};

const validateUpdateProduct = async (productId, product) => {
  const { error } = updateProductSchema.validate(product);

  if (error) {
    return {
      type: error.message.includes('required')
        ? httpStatus.BAD_REQUEST
        : httpStatus.UNPROCESSABLE_ENTITY,
      message: error.message,
    }; 
  }

  return doesProductExist(productId);
};

module.exports = {
  validateProductName,
  doesProductExist,
  validateUpdateProduct,
};