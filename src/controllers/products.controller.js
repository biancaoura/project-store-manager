const { productsService } = require('../services');

const HTTP_OK_STATUS = 200;

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

module.exports = {
  getAllProducts,
  getProductById,
};