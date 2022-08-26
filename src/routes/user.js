const express = require('express');

const userController = require('../controllers/user');
const userValidation = require('../middlewares/user');
const userAuth = require('../middlewares/auth');

const userRoutes = express.Router();

userRoutes.post('/', userValidation.validateUser, userController.create);

userRoutes.get('/', userAuth.tokenValidation, userController.getAll);

userRoutes.get('/:id', userAuth.tokenValidation, userController.getById);

module.exports = userRoutes;