const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { invalidProductSale } = require('../services/mocks/sales.service.mock');
const { createdSale, validSale, allSales, salesProducts } = require('../models/mocks/sales.model.mock');
const { HTTP_BAD_REQUEST, HTTP_CREATED, HTTP_OK_STATUS, HTTP_NOT_FOUND, HTTP_INTERNAL_SERVER_ERROR, HTTP_NO_CONTENT } = require('../../../src/utils/httpStatus');

const NOT_FOUND = 'Sale not found';
const UNKNOWN_MESSAGE = 'Unknown database \'db\'';

describe('Unit tests (Controller) - Sales', function () {

  afterEach(sinon.restore);

  describe('Testing getAll func', function () {
    it('1 - Should list all sales', async function () {
      sinon
        .stub(salesService, 'getAllSales')
        .returns({ type: null, message: allSales });
      
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('2 - Should return an error message if there\'s a server error', async function () {
      sinon
        .stub(salesService, 'getAllSales')
        .returns({ type: HTTP_INTERNAL_SERVER_ERROR, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_INTERNAL_SERVER_ERROR);
      expect(res.json).to.have.been.calledWith({ message: UNKNOWN_MESSAGE })
    });
  });

  describe('Testing getById func', function () {
    it('1 - Should get matching sale when searching by id', async function () {
      sinon
        .stub(salesService, 'getSaleById')
        .returns({ type: null, message: salesProducts });
      
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_OK_STATUS);
      expect(res.json).to.have.been.calledWith(salesProducts);
    });

    it('2 - Should return status 404 if id is not found', async function () {
      sinon
        .stub(salesService, 'getSaleById')
        .returns({ type: HTTP_NOT_FOUND, message: NOT_FOUND });
      
      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing createSale func', function () {
    it('1 - Should return the new sale', async function () {
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: createdSale });
      
      const res = {};
      const req = { body: validSale };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_CREATED);
      expect(res.json).to.have.been.calledWith(createdSale);
    });

    it('2 - Should throw an error if no product id is given', async function () {
      sinon
        .stub(salesService, 'createSale')
        .returns({ type: HTTP_BAD_REQUEST, message: '"productId" is required' });

      const res = {};
      const req = { body: invalidProductSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  });

  describe('Testing delete func', function () {
    it('1 - Should delete the correct sale', async function () {
      sinon
        .stub(salesService, 'deleteSale')
        .resolves({ type: null });

      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.end = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NO_CONTENT);
      expect(res.end).to.have.been.calledWith();
    });

    it('2 - Should throw an error if product doesn\'t exist', async function () {
      sinon
        .stub(salesService, 'deleteSale')
        .returns({ type: HTTP_NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(HTTP_NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });
});