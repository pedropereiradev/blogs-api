const express = require('express');

const categoryController = require('../controllers/category');
const userAuth = require('../middlewares/auth');

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', userAuth.tokenValidation, categoryController.create);

module.exports = categoriesRoutes;