const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id/status', auth, orderController.updateOrderStatus);
router.get('/:id/track', auth, orderController.trackOrder);
router.post('/:id/cancel', auth, orderController.cancelOrder);

module.exports = router; 