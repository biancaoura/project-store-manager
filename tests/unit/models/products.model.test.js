const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const connection = require('../../../src/models/database/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, newProduct } = require('./mocks/products.model.mock');

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

  it('3 - Should create a new product and return the correct id', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 10 }]);

    const result = await productsModel.createProduct(newProduct);

    expect(result).to.equal(10);
  });
});