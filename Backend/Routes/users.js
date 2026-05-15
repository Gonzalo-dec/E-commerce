const express = require('express');
const router = express.Router();
const {getAllUsers, updateUser, createUser, deleteUser} = require('../Controllers/users');

router.get('/', getAllUsers);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;