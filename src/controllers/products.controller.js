const { productsService } = require('../services');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productsService.getAllProducts();

  if (type) return { type, message };

  return res.status(200).json(message);
};

module.exports = {
  getAllProducts,
};