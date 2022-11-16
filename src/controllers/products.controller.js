const { productsService } = require('../services');

const httpStatus = require('../utils/httpStatus');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.getProductById(id);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;
  const { type, message } = await productsService.getProductByName(q);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { type, message } = await productsService.createProduct(name);
  
  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  const { type, message } = await productsService.updateProduct(id, product);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAllProducts,
  getProductByName,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};