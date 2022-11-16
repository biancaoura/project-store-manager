const noProductSale = [{
  quantity: 10,
}];

const invalidProductIdSale = [{
  productId: 10,
  quantity: 10,
}];

const noQuantitySale = [{
  productId: 1,
}];

const invalidNegativeQuantity = [{
  productId: 1,
  quantity: -1,
}];

const invalidSaleId = 10;

module.exports = {
  noProductSale,
  invalidProductIdSale,
  noQuantitySale,
  invalidNegativeQuantity,
  invalidSaleId,
};