const { productsModel } = require('../models');

const HTTP_NOT_FOUND = 404;

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductById = async (productId) => {
  const product = await productsModel.getProductById(productId);

  if (!product) return { type: HTTP_NOT_FOUND, message: 'Product not found' };

  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
};