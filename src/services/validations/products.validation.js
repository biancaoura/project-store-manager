const { createProductSchema, updateProductSchema } = require('./schemas');

const {
  HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY, HTTP_NOT_FOUND,
} = require('../../utils/httpStatus');
const { productsModel } = require('../../models');

const validateProductName = (name) => {
  const { error } = createProductSchema.validate({ name });

  if (!name) return { type: HTTP_BAD_REQUEST, message: error.message };
  if (error) return { type: HTTP_UNPROCESSABLE_ENTITY, message: error.message };

  return { type: null, message: '' };
};

const validateUpdateProduct = async (productId, product) => {
  const { error } = updateProductSchema.validate(product);

  if (error) {
    return {
      type: error.message.includes('required')
        ? HTTP_BAD_REQUEST
        : HTTP_UNPROCESSABLE_ENTITY,
      message: error.message,
    }; 
}

  const validation = await productsModel.getProductById(productId);

  if (!validation) return { type: HTTP_NOT_FOUND, message: 'Product not found' };

  return { type: null, message: '' };
};

module.exports = {
  validateProductName,
  validateUpdateProduct,
};