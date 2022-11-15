const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const connection = require('../../../src/models/database/connection');
const { salesModel } = require('../../../src/models');
const { validSale, createdSale, salesProducts, allSales } = require('./mocks/sales.model.mock');

describe('Unit tests (Model) - Sales', function () {

  afterEach(sinon.restore);

  it('1 - Should create a new sale and return the sale info', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

    const result = await salesModel.createProductSale(validSale);

    expect(result).to.deep.equal(createdSale);
  });

  it('2 - Should get the sale info when searching by id', async function () {
    sinon.stub(connection, 'execute').resolves([salesProducts]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.deep.equal(salesProducts);
  });

  it('3 - Should list all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);
    
    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(allSales);
  });
});