const express = require('express');

const router = express.Router();

const { productsController } = require('../controllers');

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);

module.exports = router;