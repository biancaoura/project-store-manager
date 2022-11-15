const express = require('express');

const router = express.Router();

const { salesController } = require('../controllers');

router.get('/', salesController.getAllSales);
router.post('/', salesController.createSale);

module.exports = router;