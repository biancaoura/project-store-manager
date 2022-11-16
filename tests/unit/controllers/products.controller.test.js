const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts, createdProduct, updatedProduct, queryResult, queryInput } = require('../models/mocks/products.model.mock');
const { createdProductWithId } = require('./mocks/products.controller.mock');
const httpStatus = require('../../../src/utils/httpStatus');

const NOT_FOUND = 'Product not found';
const UNKNOWN_MESSAGE = 'Unknown database \'db\'';
const NAME_REQUIRED = '"name" is required';

describe('Unit tests (Controller) - Products', function () {
  
  afterEach(sinon.restore);

  describe('Testing getAll func', function () {
    it('1 - Should list all products', async function () {
      sinon
        .stub(productsService, 'getAllProducts')
        .resolves({ type: null, message: allProducts });
      
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getAllProducts(req, res);
      
      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('2 - Should return an error message if there\'s a server error', async function () {
      sinon
        .stub(productsService, 'getAllProducts')
        .returns({ type: httpStatus.INTERNAL_SERVER_ERROR, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).to.have.been.calledWith({ message: UNKNOWN_MESSAGE })
    });
  });

  describe('Testing getById func', function () {
    it('1 - Should get matching product when searching by id', async function () {
      sinon
        .stub(productsService, 'getProductById')
        .resolves({ type: null, message: allProducts[0] });

      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('2 - Should return status 404 if id is not found', async function () {
      sinon
        .stub(productsService, 'getProductById')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing getByName func', function () {
    it('1 - Should list all products when searching with no query', async function () {
      sinon
        .stub(productsService, 'getProductByName')
        .resolves({ type: null, message: allProducts });
      
      const res = {};
      const req = { query: { q: '' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('2 - Should list the matching products when searching by query', async function () {
      sinon
        .stub(productsService, 'getProductByName')
        .resolves({ type: null, message: queryResult });

      const res = {};
      const req = { query: { q: queryInput } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(queryResult);
    });

    it('3 - Should return an error message if no product is found', async function () {
      sinon
        .stub(productsService, 'getProductByName')
        .returns({ type: httpStatus.INTERNAL_SERVER_ERROR, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = { query: { q: queryInput } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      
      await productsController.getProductByName(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).to.have.been.calledWith({ message: UNKNOWN_MESSAGE })
    });
  });

  describe('Testing createProduct func', function () {
    it('1 - Should return the new product', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: createdProductWithId });
      
      const res = {}
      const req = { body: createdProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
      expect(res.json).to.have.been.calledWith(createdProductWithId);
    });

    it('2 - Should throw an error if the name isn\'t valid', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .returns({ type: httpStatus.BAD_REQUEST, message: NAME_REQUIRED });

      const res = {}
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({ message: NAME_REQUIRED });
    });
  });

  describe('Testing update func', function () {
    it('1 - Should return the updated product', async function () {
      sinon
        .stub(productsService, 'updateProduct')
        .resolves({ type: null, message: updatedProduct });
      
      const res = {};
      const req = {
        params: { id: 1 },
        body: createdProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updatedProduct);
    });

    it('2 - Should throw an error if product id doesn\'t exist', async function () {
      sinon
        .stub(productsService, 'updateProduct')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });
      
      const res = {};
      const req = {
        params: { id: 10 },
        body: createdProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing delete func', function () {
    it('1 - Should delete the correct product', async function () {
      sinon
        .stub(productsService, 'deleteProduct')
        .resolves({ type: null });
      
        const res = {};
        const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NO_CONTENT);
      expect(res.end).to.have.been.calledWith();
    });

    it('2 - Should throw an error if product doesn\'t exist', async function () {
      sinon
        .stub(productsService, 'deleteProduct')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });
});