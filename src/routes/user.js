const express = require('express');

const userController = require('../controllers/user');
const userValidation = require('../middlewares/user');

const userRoutes = express.Router();

userRoutes.post('/', userValidation.validateUser, userController.create);

module.exports = userRoutes;