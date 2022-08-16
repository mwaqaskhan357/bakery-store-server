const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/auth');
const { placeOrder, getOrders, getOrder } = require('../controllers/order');

router.route('/').get(protect, getOrders).post(protect, placeOrder);

router.route('/:id').get(protect, getOrder);

module.exports = router;
