const { salesModel } = require('../models');
const { validateSale, validateSaleId } = require('./validations/sales.validation');
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
  let errorMessage;

  sale.map((newSale) => {
    const { type, message } = validateSale(newSale);
    if (type) errorMessage = { type, message };
    return false;
  });

  if (errorMessage) return errorMessage;

  const productValidation = await doesProductExist(sale);
  if (productValidation) return productValidation;
  
  const newSale = await salesModel.createProductSale(sale);

  return { type: null, message: newSale };
};

module.exports = {
  getAllSales,
  getSaleById,
  createSale,
};