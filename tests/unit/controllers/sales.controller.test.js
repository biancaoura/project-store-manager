const sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { expect } = require('chai');
const { afterEach } = require('mocha');

chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { invalidProductSale } = require('../services/mocks/sales.service.mock');
const { createdSale, validSale } = require('../models/mocks/sales.model.mock');

describe('Unit tests (Controller) - Sales', function () {

  afterEach(sinon.restore);

  describe('Testing createSale func', function () {
    it('1 - Should throw an error if no product id is given', async function () {
      sinon
        .stub(salesService, 'createSale')
        .returns({ type: 400, message: '"productId" is required' });
      
      const res = {};
      const req = { body: invalidProductSale };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ message: '"productId" is required' });
    });

    it('2 - Should return the created sale', async function () {
      sinon
        .stub(salesService, 'createSale')
        .resolves({ type: null, message: createdSale });
      
      const res = {};
      const req = { body: validSale };
      
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201);
      expect(res.json).to.have.been.calledWith(createdSale);
    });
  });
});