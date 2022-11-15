const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts, updatedProduct } = require('../models/mocks/products.model.mock');
const { validNewName, invalidNameLen, newProduct } = require('./mocks/products.service.mock');
const { createdProduct } = require('../controllers/mocks/products.controller.mock');
const { HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY, HTTP_NOT_FOUND } = require('../../../src/utils/httpStatus');

const NOT_FOUND = 'Product not found';

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
      
      expect(message).to.deep.equal(NOT_FOUND);
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

      const { type, message } = await productsService.createProduct(newProduct);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdProduct);
    });
  });

  describe('Updating products', function () {
    it('1 - Should throw an error if product id doesn\'t exist', async function () {
      sinon.stub(productsModel, 'updateProduct').returns(undefined);

      const { type, message } = await productsService.updateProduct(10, validNewName);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.equal(NOT_FOUND);
    });

    it('2 - Should throw an error if no new name is given', async function () {
      const { type, message } = await productsService.updateProduct(1, {});

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal('"name" is required');
    });

    it('3 - Should throw an error if the new name has less than 5 characters', async function () {
      const { type, message } = await productsService.updateProduct(1, invalidNameLen);

      expect(type).to.equal(HTTP_UNPROCESSABLE_ENTITY);
      expect(message).to.equal('"name" length must be at least 5 characters long');
    });

    it('4 - Should return the updated product info', async function () {
      sinon.stub(productsModel, 'updateProduct').returns(updatedProduct);

      const { type, message } = await productsService.updateProduct(1, validNewName);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(updatedProduct);
    });
  });
});