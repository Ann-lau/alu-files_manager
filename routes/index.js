const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UsersController = require('../controllers/UsersController');

// Existing routes
router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

// New route for user creation
router.post('/users', UsersController.postNew);

module.exports = router;

