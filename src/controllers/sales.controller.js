const { salesService } = require('../services');

const { HTTP_CREATED, HTTP_OK_STATUS } = require('../utils/httpStatus');

const getAllSales = async (req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const createSale = async (req, res) => {
  const { type, message } = await salesService.createSale(req.body);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_CREATED).json(message);
};

module.exports = {
  getAllSales,
  createSale,
};