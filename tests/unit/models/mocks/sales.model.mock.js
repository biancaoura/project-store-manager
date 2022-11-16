const allSales = [
  {
    saleId: 1,
    date: '2022-11-15T01:45:05.000Z',
    productId: 1,
    quantity: 5,
  },
  {
    saleId: 1,
    date: '2022-11-15T01:45:05.000Z',
    productId: 2,
    quantity: 10,
  },
  {
    saleId: 2,
    date: '2022-11-15T01:45:05.000Z',
    productId: 3,
    quantity: 15,
  },
];

const saleInfoById = [
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

const validSaleInput = [
  {
    productId: 1,
    quantity: 1,
  },
  {
    productId: 2,
    quantity: 5,
  },
];

const updatedSale = {
  saleId: 1,
  itemsUpdated: [
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
  allSales,
  saleInfoById,
  validSaleInput,
  updatedSale,
  createdSale,
};