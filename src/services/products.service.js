const { productsModel } = require('../models');
const { validateProductName, validateUpdateProduct } = require('./validations/products.validation');

const { HTTP_NOT_FOUND } = require('../utils/httpStatus');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductById = async (productId) => {
  const product = await productsModel.getProductById(productId);

  if (!product) return { type: HTTP_NOT_FOUND, message: 'Product not found' };

  return { type: null, message: product };
};

const createProduct = async (name) => {
  const { type, message } = validateProductName(name);

  if (type) return { type, message };

  const newProductId = await productsModel.createProduct(name);
  const newProduct = await productsModel.getProductById(newProductId);

  return { type: null, message: newProduct };
};

const updateProduct = async (productId, product) => {
  const { type, message } = await validateUpdateProduct(productId, product);

  if (type) return { type, message };

  const { name } = product;
  const updatedProduct = await productsModel.updateProduct(productId, name);

  return { type: null, message: updatedProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};