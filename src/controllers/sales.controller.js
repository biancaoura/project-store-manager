const { salesService } = require('../services');

const { HTTP_CREATED, HTTP_OK_STATUS, HTTP_NO_CONTENT } = require('../utils/httpStatus');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const createSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.createSale(sale);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_CREATED).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const sale = req.body;

  const { type, message } = await salesService.updateSale(id, sale);
  
  if (type) return res.status(type).json({ message });

  return res.status(HTTP_OK_STATUS).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(type).json({ message });

  return res.status(HTTP_NO_CONTENT).end();
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};