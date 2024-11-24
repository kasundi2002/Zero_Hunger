const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register (signup) a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// Get all users
router.get('/getAllUsers', userController.getAllUsers);

// Get a user by ID
router.get('/getUser/:id', userController.getUserById);

// Update a user by ID
router.put('/updateUser/:id', userController.updateUser);

// Delete a user by ID
router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
