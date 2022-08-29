const express = require('express');

const postController = require('../controllers/post');
const postValidation = require('../middlewares/post');

const userAuth = require('../middlewares/auth');

const postRoutes = express.Router();

postRoutes.post('/', postValidation.validatePost, userAuth.tokenValidation, postController.create);

module.exports = postRoutes;