const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const connection = require('../../../src/models/database/connection');
const { salesModel } = require('../../../src/models');
const { validSale, createdSale, salesProducts, allSales, updatedSale } = require('./mocks/sales.model.mock');

describe('Unit tests (Model) - Sales', function () {

  afterEach(sinon.restore);

  it('1 - Should list all sales', async function () {
    sinon.stub(connection, 'execute').resolves([allSales]);

    const result = await salesModel.getAllSales();

    expect(result).to.deep.equal(allSales);
  });

  it('2 - Should get the sale info when searching by id', async function () {
    sinon.stub(connection, 'execute').resolves([salesProducts]);

    const result = await salesModel.getSaleById(1);

    expect(result).to.deep.equal(salesProducts);
  });

  it('3 - Should create a new sale and return the sale info', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

    const result = await salesModel.createProductSale(validSale);

    expect(result).to.deep.equal(createdSale);
  });

  it('4 - Should update the sale with matching id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await salesModel.updateSale(1, validSale);

    expect(result).to.deep.equal(updatedSale);
  });

  it('5 - Should delete the sale with matching id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await salesModel.deleteSale(1);

    expect(result).to.equal();
  });
});