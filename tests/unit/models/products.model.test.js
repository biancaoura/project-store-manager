const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const connection = require('../../../src/models/database/connection');
const { productsModel } = require('../../../src/models');
const { allProducts, newProduct, newName, updatedProduct, queryInput } = require('./mocks/products.model.mock');

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

  it('4 - Should change the product name and return the updated info', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModel.updateProduct(1, newName);

    expect(result).to.deep.equal(updatedProduct);
  });

  it('5 - Should delete the product with matching id', async function () {
    sinon.stub(connection, 'execute').resolves([{ affectedRows: 1 }]);

    const result = await productsModel.deleteProduct(1);

    expect(result).to.equal();
  });

  it('6 - Should list all products when searching with no query', async function () {
    sinon.stub(connection, 'execute').resolves([allProducts]);

    const result = await productsModel.getProductByName();

    expect(result).to.equal(allProducts);
  });

  it('7 - Should list the matching products when searching by query', async function () {
    sinon.stub(connection, 'execute').resolves([queryInput]);

    const result = await productsModel.getProductByName('mar');

    expect(result).to.equal(queryInput);
  });
});