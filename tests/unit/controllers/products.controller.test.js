const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { allProducts } = require('../models/mocks/products.model.mock');
const { createdProduct } = require('./mocks/products.controller.mock');

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
      
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    it('2 - Should return an error message if there\'s a server error', async function () {
      sinon
        .stub(productsService, 'getAllProducts')
        .returns({ type: 500, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getAllProducts(req, res);

      expect(res.status).to.have.been.calledWith(500);
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

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts[0]);
    });

    it('2 - Should return status 404 if id is not found', async function () {
      sinon
        .stub(productsService, 'getProductById')
        .returns({ type: 404, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.getProductById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing createProduct func', function () {
    it('1 - Should throw an error if the name isn\'t valid', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .returns({ type: 400, message: '"name" is required' });
        
      const res = {}
      const req = { body: {} };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
    
      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
    });

    it('2 - Should return the new product', async function () {
      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: createdProduct });
      
      const res = {}
      const req = { body: { name: 'Manopla de Thanos' } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdProduct);
    });
  });
});