const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const { allProducts, updatedProduct, queryResult, newProduct, queryInput } = require('../models/mocks/products.model.mock');
const { validNewName, invalidNameLen } = require('./mocks/products.service.mock');
const { createdProductWithId } = require('../controllers/mocks/products.controller.mock');
const httpStatus = require('../../../src/utils/httpStatus');

const NOT_FOUND = 'Product not found';
const NAME_REQUIRED = '"name" is required';
const NAME_LEN_REQUIRED = '"name" length must be at least 5 characters long';

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

      expect(type).to.equal(httpStatus.BAD_REQUEST);
      expect(message).to.equal(NAME_REQUIRED);
    });

    it('2 - Should throw an error if the name has less than 5 characters', async function () {
      const { type, message } = await productsService.createProduct('a');

      expect(type).to.equal(httpStatus.UNPROCESSABLE_ENTITY);
      expect(message).to.equal(NAME_LEN_REQUIRED);
    });

    it('3 - Should return the new product', async function () {
      sinon.stub(productsModel, 'createProduct').resolves([{ insertId: 10 }]);
      sinon.stub(productsModel, 'getProductById').resolves(createdProductWithId);

      const { type, message } = await productsService.createProduct(newProduct);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdProductWithId);
    });
  });

  describe('Updating products', function () {
    it('1 - Should throw an error if product id doesn\'t exist', async function () {
      sinon.stub(productsModel, 'updateProduct').returns(undefined);

      const { type, message } = await productsService.updateProduct(10, validNewName);

      expect(type).to.equal(httpStatus.NOT_FOUND);
      expect(message).to.equal(NOT_FOUND);
    });

    it('2 - Should throw an error if no new name is given', async function () {
      const { type, message } = await productsService.updateProduct(1, {});

      expect(type).to.equal(httpStatus.BAD_REQUEST);
      expect(message).to.equal(NAME_REQUIRED);
    });

    it('3 - Should throw an error if the new name has less than 5 characters', async function () {
      const { type, message } = await productsService.updateProduct(1, invalidNameLen);

      expect(type).to.equal(httpStatus.UNPROCESSABLE_ENTITY);
      expect(message).to.equal(NAME_LEN_REQUIRED);
    });

    it('4 - Should return the updated product info', async function () {
      sinon.stub(productsModel, 'updateProduct').returns(updatedProduct);

      const { type, message } = await productsService.updateProduct(1, validNewName);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(updatedProduct);
    });
  });

  describe('Deleting products', function () {
    it('1 - Should delete the correct product', async function () {
      sinon.stub(productsModel, 'deleteProduct').resolves();

      const { type } = await productsService.deleteProduct(1);

      expect(type).to.equal(null);
    });

    it('2 - Should throw an error if product doesn\'t exist', async function () {
      sinon.stub(productsModel, 'deleteProduct').returns(undefined);

      const { type, message } = await productsService.deleteProduct(10);

      expect(type).to.equal(httpStatus.NOT_FOUND);
      expect(message).to.equal(NOT_FOUND);
    });
  });

  describe('Searching products', function () {
    it('1 - Should list all products when searching with no query', async function () {
      sinon.stub(productsModel, 'getProductByName').resolves(allProducts);

      const { type, message } = await productsService.getProductByName();

      expect(type).to.equal(null);
      expect(message).to.deep.equal(allProducts);
    });
    
    it('2 - Should list the matching products when searching by query', async function () {
      sinon.stub(productsModel, 'getProductByName').resolves(queryResult);

      const { type, message } = await productsService.getProductByName(queryInput);

      expect(type).to.equal(null);
      expect(message).to.equal(queryResult);
    });
  });
});