const express = require('express');
const {getAllOrders, createOrder, deleteOrder} = require('../Controllers/orders');
const router = express.Router();

router.get('/', getAllOrders);

router.post('/', createOrder);

router.delete('/:id', deleteOrder);

module.exports = router;
