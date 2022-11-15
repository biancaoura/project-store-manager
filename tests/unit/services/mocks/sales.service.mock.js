const invalidProductSale = [{
  quantity: 10,
}];

const invalidProductIdSale = [{
  productId: 10,
  quantity: 10,
}];

const invalidQuantitySale = [{
  productId: 1,
}];

const invalidNegativeQuantity = [{
  productId: 1,
  quantity: -1,
}];

const invalidSaleId = 10;

module.exports = {
  invalidProductSale,
  invalidProductIdSale,
  invalidQuantitySale,
  invalidNegativeQuantity,
  invalidSaleId,
};