const sinon = require('sinon');
const { expect } = require('chai');
const { afterEach } = require('mocha');

const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { invalidProductIdSale, noProductSale, noQuantitySale, invalidNegativeQuantity, invalidSaleId } = require('./mocks/sales.service.mock');
const { validSaleInput, createdSale, allSales, saleInfoById, updatedSale } = require('../models/mocks/sales.model.mock');
const { HTTP_NOT_FOUND, HTTP_BAD_REQUEST, HTTP_UNPROCESSABLE_ENTITY } = require('../../../src/utils/httpStatus');

const SALE_NOT_FOUND = 'Sale not found';
const PRODUCT_NOT_FOUND = 'Product not found';
const QUANTITY_REQUIRED = '"quantity" is required';

describe('Unit tests (Service) - Sales', function () {

  afterEach(sinon.restore);

  describe('Listing sales', function () {
    it('1 - Should list all sales', async function () {
      sinon.stub(salesModel, 'getAllSales').resolves(allSales);

      const { message } = await salesService.getAllSales();

      expect(message).to.deep.equal(allSales);
    });

    it('2 - Should get matching sale when searching by id', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(saleInfoById);

      const { message } = await salesService.getSaleById(1);

      expect(message).to.deep.equal(saleInfoById);
    });

    it('3 - Should return an error message if id is not found', async function () {
      sinon.stub(salesModel, 'getSaleById').returns([]);

      const { message } = await salesService.getSaleById(10);

      expect(message).to.equal(SALE_NOT_FOUND);
    });
  });

  describe('Creating sales', function () {
    it('1 - Should throw an error if product id doesn\'t exist', async function () {
      const { type, message } = await salesService.createSale(invalidProductIdSale);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.equal(PRODUCT_NOT_FOUND);
    });

    it('2 - Should throw an error if product is not specified', async function () {
      const { type, message } = await salesService.createSale(noProductSale);

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal('"productId" is required');
    });

    it('3 - Should throw an error if quantity is not specified', async function () {
      const { type, message } = await salesService.createSale(noQuantitySale);

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.equal(QUANTITY_REQUIRED);
    });

    it('4 - Should throw an error if quantity is zero or negative', async function () {
      const { type, message } = await salesService.createSale(invalidNegativeQuantity);

      expect(type).to.equal(HTTP_UNPROCESSABLE_ENTITY);
      expect(message).to.equal('"quantity" must be greater than or equal to 1');
    });

    it('5 - Should return the new sale', async function () {
      sinon.stub(salesModel, 'createProductSale').resolves(createdSale);
      
      const { type, message } = await salesService.createSale(validSaleInput);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(createdSale);
    });
  });

  describe('Updating sales', function () {
    it('1 - Should throw an error if sale id is invalid', async function () {
      sinon.stub(salesModel, 'updateSale').returns(undefined);

      const { type, message } = await salesService.updateSale(invalidSaleId, validSaleInput);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.deep.equal(SALE_NOT_FOUND);
    });
    
    it('2 - Should throw an error if product id doesn\'t exist', async function () {
      const { type, message } = await salesService.updateSale(1, invalidProductIdSale);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.deep.equal(PRODUCT_NOT_FOUND);
    });

    it('3 - Should throw an error if no quantity is specified', async function () {
      const { type, message } = await salesService.updateSale(1, noQuantitySale);

      expect(type).to.equal(HTTP_BAD_REQUEST);
      expect(message).to.deep.equal(QUANTITY_REQUIRED);
    });

    it('4 - Should return the updated sale', async function () {
      sinon.stub(salesModel, 'updateSale').returns(updatedSale);

      const { type, message } = await salesService.updateSale(1, validSaleInput);

      expect(type).to.equal(null);
      expect(message).to.deep.equal(updatedSale);
    });
  });

  describe('Deleting sales', function () {
    it('1 - Should delete the correct sale', async function () {
      sinon.stub(salesModel, 'getSaleById').resolves(saleInfoById);
      sinon.stub(salesModel, 'deleteSale').resolves();

      const { type } = await salesService.deleteSale(1);

      expect(type).to.equal(null);
    });

    it('2 - Should throw an error if sale doesn\'t exist', async function () {
      sinon.stub(salesModel, 'deleteSale').returns(undefined);

      const { type, message } = await salesService.deleteSale(10);

      expect(type).to.equal(HTTP_NOT_FOUND);
      expect(message).to.equal(SALE_NOT_FOUND);
    });
  });
});