const salesProducts = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
  },
];

const invalidProductIdSale = [{
  productId: 10,
  quantity: 10,
}];

const validSale = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const createdSale = {
  id: 10,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  salesProducts,
  invalidProductIdSale,
  validSale,
  createdSale,
};