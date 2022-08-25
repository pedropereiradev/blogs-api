const express = require('express');

const loginController = require('../controllers/login');
const loginValidation = require('../middlewares/login');

const loginRoutes = express.Router();

loginRoutes.post('/', loginValidation.validateLogin, loginController.login);

module.exports = loginRoutes;