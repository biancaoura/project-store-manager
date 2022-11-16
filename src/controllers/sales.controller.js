const { salesService } = require('../services');

const httpStatus = require('../utils/httpStatus');

const getAllSales = async (_req, res) => {
  const { type, message } = await salesService.getAllSales();

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getSaleById(id);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const createSale = async (req, res) => {
  const sale = req.body;

  const { type, message } = await salesService.createSale(sale);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.CREATED).json(message);
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.updateSale(id, req.body);
  
  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.OK).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await salesService.deleteSale(id);

  if (type) return res.status(type).json({ message });

  return res.status(httpStatus.NO_CONTENT).end();
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};