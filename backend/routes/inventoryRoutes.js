const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

router.get('/', inventoryController.getAllProducts);
router.get('/:id', inventoryController.getProductById);
router.post('/', auth, isAdmin, inventoryController.createProduct);
router.put('/:id', auth, isAdmin, inventoryController.updateProduct);
router.delete('/:id', auth, isAdmin, inventoryController.deleteProduct);
router.put('/:id/stock', auth, isAdmin, inventoryController.updateStock);

module.exports = router; 