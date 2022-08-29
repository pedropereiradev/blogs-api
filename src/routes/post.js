const express = require('express');

const postController = require('../controllers/post');
const postValidation = require('../middlewares/post');

const userAuth = require('../middlewares/auth');

const postRoutes = express.Router();

postRoutes.post('/', postValidation.validatePost, userAuth.tokenValidation, postController.create);

postRoutes.get('/search', userAuth.tokenValidation, postController.getByQuery);

postRoutes.get('/:id', userAuth.tokenValidation, postController.getById);

postRoutes.get('/', userAuth.tokenValidation, postController.getAll);

postRoutes.put('/:id', postValidation.validatePut, userAuth.tokenValidation, postController.update);

postRoutes.delete('/:id', userAuth.tokenValidation, postController.destroy);

module.exports = postRoutes;