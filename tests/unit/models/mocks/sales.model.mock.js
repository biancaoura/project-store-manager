const salesProducts = [
  {
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },
  {
    date: '2021-09-09T04:54:54.000Z',
    productId: 2,
    quantity: 2
  }
];

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
  validSale,
  createdSale,
};