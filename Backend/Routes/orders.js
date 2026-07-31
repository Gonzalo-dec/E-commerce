const express = require('express');
const { getOrdersById, checkout, deleteOrder} = require('../Controllers/orders');
const autorizar  = require('../Middlewares/auth');
const router = express.Router(); 

router.get('/', autorizar, getOrdersById);

router.post('/', autorizar, checkout);

router.delete('/:id', autorizar, deleteOrder);

module.exports = router;
