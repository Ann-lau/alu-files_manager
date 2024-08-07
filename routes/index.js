const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');

// Define the route for creating a new user
router.post('/users', UsersController.postNew);

module.exports = router;

