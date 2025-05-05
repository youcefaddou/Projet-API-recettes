const recipeRouter = require('express').Router();
const recipeModel = require('../models/recipeModel');
const recipeController = require('../controllers/recipeController');
const upload = require('../middleware/upload');

recipeRouter.post('/recipes', upload.single('image'), recipeController.postRecipe);
recipeRouter.get('/recipes', recipeController.getRecipes);
recipeRouter.get('/recipes/:id', recipeController.getRecipe);
recipeRouter.put('/recipes/:id', upload.single('image'), recipeController.updateRecipe);
recipeRouter.delete('/recipes/:id', recipeController.deleteRecipe);

module.exports = recipeRouter;