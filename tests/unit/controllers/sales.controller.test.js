const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { noProductSale } = require('../services/mocks/sales.service.mock');
const { createdSale, validSaleInput, allSales, saleInfoById, updatedSale } = require('../models/mocks/sales.model.mock');
const httpStatus = require('../../../src/utils/httpStatus');

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

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(allSales);
    });

    it('2 - Should return an error message if there\'s a server error', async function () {
      sinon
        .stub(salesService, 'getAllSales')
        .returns({ type: httpStatus.INTERNAL_SERVER_ERROR, message: UNKNOWN_MESSAGE });

      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).to.have.been.calledWith({ message: UNKNOWN_MESSAGE })
    });
  });

  describe('Testing getById func', function () {
    it('1 - Should get matching sale when searching by id', async function () {
      sinon
        .stub(salesService, 'getSaleById')
        .returns({ type: null, message: saleInfoById });
      
      const res = {};
      const req = { params: { id: 1 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(saleInfoById);
    });

    it('2 - Should return status 404 if id is not found', async function () {
      sinon
        .stub(salesService, 'getSaleById')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });
      
      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });

  describe('Testing createSale func', function () {
    it('1 - Should return the new sale', async function () {
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: createdSale });
      
      const res = {};
      const req = { body: validSaleInput };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.CREATED);
      expect(res.json).to.have.been.calledWith(createdSale);
    });

    it('2 - Should throw an error if no product id is given', async function () {
      sinon
        .stub(salesService, 'createSale')
        .returns({ type: httpStatus.BAD_REQUEST, message: '"productId" is required' });

      const res = {};
      const req = { body: noProductSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.BAD_REQUEST);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });
  });

  describe('Testing update func', function () {
    it('1 - Should return the updated sale', async function () {
      sinon
        .stub(salesService, 'updateSale')
        .resolves({ type: null, message: updatedSale });
      
      const res = {};
      const req = {
        params: { id: 1 },
        body: validSaleInput,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.OK);
      expect(res.json).to.have.been.calledWith(updatedSale);
    });

    it('2 - Should throw an error if sale id doesn\'t exist', async function () {
      sinon
        .stub(salesService, 'updateSale')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = {
        params: { id: 10 },
        body: validSaleInput,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.updateSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
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

      expect(res.status).to.have.been.calledWith(httpStatus.NO_CONTENT);
      expect(res.end).to.have.been.calledWith();
    });

    it('2 - Should throw an error if product doesn\'t exist', async function () {
      sinon
        .stub(salesService, 'deleteSale')
        .returns({ type: httpStatus.NOT_FOUND, message: NOT_FOUND });

      const res = {};
      const req = { params: { id: 10 } };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.deleteSale(req, res);

      expect(res.status).to.have.been.calledWith(httpStatus.NOT_FOUND);
      expect(res.json).to.have.been.calledWith({ message: NOT_FOUND });
    });
  });
});