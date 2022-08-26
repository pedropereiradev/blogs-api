const express = require('express');

const categoryController = require('../controllers/category');
const userAuth = require('../middlewares/auth');

const categoriesRoutes = express.Router();

categoriesRoutes.post('/', userAuth.tokenValidation, categoryController.create);

categoriesRoutes.get('/', userAuth.tokenValidation, categoryController.getAll);

module.exports = categoriesRoutes;