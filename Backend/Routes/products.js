const express = require('express');
const router = express.Router();
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../Controllers/products');
const autorizar = require('../Middlewares/auth');
const upload = require('../Middlewares/upload');

router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/',  autorizar, upload.single('image'), createProduct);

router.put('/:id',  autorizar, updateProduct);

router.delete('/:id',  autorizar, deleteProduct);

module.exports = router;