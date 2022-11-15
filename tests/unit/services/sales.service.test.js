const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { invalidProductIdSale, invalidProductSale, invalidQuantitySale, invalidNegativeQuantity } = require('./mocks/sales.service.mock');
const { validSale, createdSale } = require('../models/mocks/sales.model.mock');
const { HTTP_NOT_FOUND, HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('../../../src/utils/httpStatus');

describe('Unit tests (Service) - Sales', function () {

  afterEach(sinon.restore);

  describe('Creating a new sale', function () {
    it('1 - Should throw an error if product id doesn\'t exist', async function () {
      const { type, message } = await salesService.createSale(invalidProductIdSale);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.equal('Product not found');
    });

    it('2 - Should throw an error if product is not specified', async function () {
      const { type, message } = await salesService.createSale(invalidProductSale);

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal('"productId" is required');
    });

    it('3 - Should throw an error if quantity is not specified', async function () {
      const { type, message } = await salesService.createSale(invalidQuantitySale);

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal('"quantity" is required');
    });

    it('4 - Should throw an error if quantity is zero or negative', async function () {
      const { type, message } = await salesService.createSale(invalidNegativeQuantity);

      expect(type).to.equal(HTTP_UNPROCESSABLE_ENTITY);
      expect(message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('5 - Should return the created sale', async function () {
      sinon.stub(salesModel, 'createProductSale').resolves(createdSale);
      
      const { type, message } = await salesService.createSale(validSale);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdSale);
    });
  });
});