const { salesService } = require('../services');

const HTTP_CREATED = 201;

const createSale = async (req, res) => {
  const { type, message } = await salesService.createSale(req.body);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_CREATED).json(message);
};

module.exports = {
  createSale,
};