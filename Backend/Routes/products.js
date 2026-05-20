const express = require('express');
const router = express.Router();
const {getAllProducts, createProduct, updateProduct, deleteProduct} = require('../Controllers/products');
const autorizar = require('../Middlewares/auth');

router.get('/',  autorizar, getAllProducts);

router.post('/',  autorizar, createProduct);

router.put('/:id',  autorizar, updateProduct);

router.delete('/:id',  autorizar, deleteProduct);

module.exports = router;