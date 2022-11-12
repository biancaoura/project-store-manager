const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/models/database/connection');
const { productsModel } = require('../../../src/models');
const { allProducts } = require('./mocks/products.model.mock');
const { afterEach } = require('mocha');

describe('Unit tests (Model) - Products', function () {

  afterEach(sinon.restore);

  it('1 - Should list all products', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.getAllProducts();

    expect(result).to.deep.equal(allProducts);
  });

  it('2 - Should get matching product when searching by id', async function () {
    sinon.stub(connection, 'execute').resolves([[allProducts[0]]]);

    const result = await productsModel.getProductById(1);

    expect(result).to.deep.equal(allProducts[0]);
  });
});