const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts, newProduct, updatedProduct } = require('../models/mocks/products.model.mock');
const { createdProduct } = require('./mocks/products.controller.mock');
const { HTTP_OK_STATUS, HTTP_INTERNAL_SERVER_ERROR, HTTP_NOT_FOUND, HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_NO_CONTENT } = require('../../../src/utils/httpStatus');

const NOT_FOUND = 'Product not found';
const UNKNOWN_MESSAGE = 'Unknown database \'db\'';

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
      
      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('2 - Should return an error message if there\'s a server error', async function () {
      sinon
        .stub(productsService, 'getAllProducts')
        .returns({ type: HTTP_INTERNAL_SERVER_ERROR, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_INTERNAL_SERVER_ERROR);
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

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('2 - Should return status 404 if id is not found', async function () {
      sinon
        .stub(productsService, 'getProductById')
        .returns({ type: HTTP_NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing createProduct func', function () {
    it('1 - Should return the new product', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: createdProduct });
      
      const res = {}
      const req = { body: newProduct };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_CREATED);
      expect(res.json).to.have.been.calledWith(createdProduct);
    });

    it('2 - Should throw an error if the name isn\'t valid', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .returns({ type: HTTP_BAD_REQUEST, message: '"name" is required' });

      const res = {}
      const req = { body: {} };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
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
        body: newProduct,
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
        .returns({ type: HTTP_NOT_FOUND, message: NOT_FOUND });
      
      const res = {};
      const req = {
        params: { id: 10 },
        body: newProduct,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
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

      expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT);
      expect(res.end).to.have.been.calledWith();
    });

    it('2 - Should throw an error if product doesn\'t exist', async function () {
      sinon
        .stub(productsService, 'deleteProduct')
        .returns({ type: HTTP_NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.deleteProduct(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });
});