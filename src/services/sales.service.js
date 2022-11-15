const { salesModel } = require('../models');
const {
  validateSaleId,
  validateSale,
  validateSaleUpdate,
} = require('./validations/sales.validation');
const { doesProductExist } = require('./validations/sales_products.validation');

const getAllSales = async () => {
  const allSales = await salesModel.getAllSales();

  return { type: null, message: allSales };
};

const getSaleById = async (saleId) => {
  const { type, message } = await validateSaleId(saleId);

  if (type) return { type, message };

  return { type: null, message };
};

const createSale = async (sale) => {
  const errorMessage = validateSale(sale);
  if (errorMessage) return errorMessage;

  const productValidation = await doesProductExist(sale);
  if (productValidation) return productValidation;
  
  const newSale = await salesModel.createProductSale(sale);

  return { type: null, message: newSale };
};

const updateSale = async (saleId, sale) => {
  const { type, message } = await validateSaleUpdate(saleId, sale);
  if (type) return { type, message };

  const updatedSale = await salesModel.updateSale(saleId, sale);

  return { type: null, message: updatedSale };
};

const deleteSale = async (saleId) => {
  const { type, message } = await validateSaleId(saleId);

  if (type) return { type, message };

  await salesModel.deleteSale(saleId);

  return { type: null };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
  updateSale,
  deleteSale,
};