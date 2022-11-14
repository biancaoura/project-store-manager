const { salesModel } = require('../models');
const { validateSale } = require('./validations/sales.validation');
const { doesProductExist } = require('./validations/sales_products.validation');

const createSale = async (sale) => {
  let errorMessage;
  sale.map((newSale) => {
    const { type, message } = validateSale(newSale);
    if (type) return { type, message };
    return false;
  });

  if (errorMessage) return errorMessage;

  const productValidation = await doesProductExist(sale);
  if (productValidation) return productValidation;
  
  const newSale = await salesModel.createProductSale(sale);

  return { type: null, message: newSale };
};

module.exports = {
  createSale,
};