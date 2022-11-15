const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getAllSales);
router.get('/:id', salesController.getSaleById);

router.post('/', salesController.createSale);

router.delete('/:id', salesController.deleteSale);

module.exports = router;