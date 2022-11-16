const httpStatus = require('../../utils/httpStatus');
const { productsModel } = require('../../models');

const doesProductExist = async (sale) => {
  const product = await sale.map(({ productId }) => productsModel.getProductById(productId));
  const promise = await Promise.all(product);

  const validProduct = promise.every((item) => item);

  if (!validProduct) return { type: httpStatus.NOT_FOUND, message: 'Product not found' };
  return false;
};

module.exports = {
  doesProductExist,
};