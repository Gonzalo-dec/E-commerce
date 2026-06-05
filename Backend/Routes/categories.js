const express = require('express');
const router = express.Router();
const { getAllCategories, getProductsByCategoryId } = require('../Controllers/categories');

router.get('/', getAllCategories);

router.get('/:id', getProductsByCategoryId);

module.exports = router;