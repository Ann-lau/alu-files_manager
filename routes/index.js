const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');

router.post('/users', UsersController.postNew);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/users/me', UsersController.getMe);

module.exports = router;


