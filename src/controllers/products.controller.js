const { productsService } = require('../services');

const { HTTP_OK_STATUS, HTTP_CREATED } = require('../utils/httpStatus');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  // const { name } = req.body;
  const product = req.body;
  const { type, message } = await productsService.updateProduct(id, product);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};