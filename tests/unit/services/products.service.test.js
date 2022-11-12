const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/products.model.mock');

describe('Unit tests (Service) - Products', function () {

  afterEach(sinon.restore);

  it('1 - Should list all products', async function () {
    sinon.stub(productsModel, 'getAllProducts').resolves(allProducts);

    const { message } = await productsService.getAllProducts();

    expect(message).to.deep.equal(allProducts);
  });

  it('2 - Should get matching product when searching by id', async function () {
    sinon.stub(productsModel, 'getProductById').resolves(allProducts[0]);

    const { message } = await productsService.getProductById(1);

    expect(message).to.deep.equal(allProducts[0]);
  });

  it('3 - Should return an error message if id is not found', async function () {
    sinon.stub(productsModel, 'getProductById').returns(undefined);

    const { message } = await productsService.getProductById(10);

    expect(message).to.deep.equal('Product not found');
  });
});