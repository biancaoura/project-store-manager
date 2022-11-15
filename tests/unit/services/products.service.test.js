const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts } = require('../models/mocks/products.model.mock');
const { createdProduct } = require('../controllers/mocks/products.controller.mock');
const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('../../../src/utils/httpStatus');

describe('Unit tests (Service) - Products', function () {

  afterEach(sinon.restore);

  describe('Listing products', function () {
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

  describe('Creating products', function () {
    it('1 - Should throw an error if no name is given', async function () {
      const { type, message } = await productsService.createProduct();

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal('"name" is required');
    });

    it('2 - Should throw an error if the name has less than 5 characters', async function () {
      const { type, message } = await productsService.createProduct('a');

      expect(type).to.equal(HTTP_UNPROCESSABLE_ENTITY);
      expect(message).to.equal('"name" length must be at least 5 characters long');
    });

    it('3 - Should return the new product', async function () {
      sinon.stub(productsModel, 'createProduct').resolves([{ insertId: 10 }]);
      sinon.stub(productsModel, 'getProductById').resolves(createdProduct);

      const { type, message } = await productsService.createProduct('Manopla de Thanos');

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdProduct);
    });
  });
});