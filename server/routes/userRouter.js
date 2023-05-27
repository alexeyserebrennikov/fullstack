const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users
router.get('/', userController.getAllUsers);

// POST /users
router.post('/', userController.createUser);

// GET /users/:id
router.get('/:id', userController.getUserById);

// PUT /users/:id
router.put('/:id', userController.updateUser);

// DELETE /users/:id
router.delete('/:id', userController.deleteUser);

module.exports = router;
