const { productsModel } = require('../models');
const {
  validateProductName,
  validateUpdateProduct,
  doesProductExist,
} = require('./validations/products.validation');

const httpStatus = require('../utils/httpStatus');

const getAllProducts = async () => {
  const allProducts = await productsModel.getAllProducts();

  return { type: null, message: allProducts };
};

const getProductById = async (productId) => {
  const product = await productsModel.getProductById(productId);

  if (!product) return { type: httpStatus.NOT_FOUND, message: 'Product not found' };

  return { type: null, message: product };
};

const getProductByName = async (query) => {
  if (!query) return getAllProducts();

  const searchResult = await productsModel.getProductByName(query);

  return { type: null, message: searchResult };
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

const deleteProduct = async (productId) => {
  const { type, message } = await doesProductExist(productId);

  if (type) return { type, message };

  await productsModel.deleteProduct(productId);

  return { type: null };
};

module.exports = {
  getAllProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};