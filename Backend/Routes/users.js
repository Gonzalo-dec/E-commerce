const express = require('express');
const router = express.Router();
const {getAllUsers, updateUser, createUser, deleteUser} = require('../Controllers/users');
const autorizar = require('../Middlewares/auth')

router.get('/', autorizar, getAllUsers);

router.post('/', createUser);

router.put('/:id',  autorizar, updateUser);

router.delete('/:id',  autorizar, deleteUser);

module.exports = router;