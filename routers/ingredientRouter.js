const ingredientRouter = require('express').Router();
const ingredientModel = require('../models/ingredientModel');
const ingredientController = require('../controllers/ingredientController');

// Routes pour les ingrédients indépendants
ingredientRouter.post('/ingredients', ingredientController.postIngredient);
ingredientRouter.get('/ingredients', ingredientController.getIngredients);
ingredientRouter.get('/ingredients/:id', ingredientController.getIngredient);
ingredientRouter.put('/ingredients/:id', ingredientController.updateIngredient);
ingredientRouter.delete('/ingredients/:id', ingredientController.deleteIngredient);

// Routes pour les ingrédients d'une recette
ingredientRouter.post('/recipes/:id/ingredients', ingredientController.postIngredientbyRecipe);
ingredientRouter.get('/recipes/:id/ingredients', ingredientController.getIngredientsbyRecipe);
ingredientRouter.delete('/recipes/:recipeId/ingredients/:ingredientId', ingredientController.deleteIngredientbyRecipe);
ingredientRouter.put('/recipes/:recipeId/ingredients/:ingredientId', ingredientController.updateIngredientbyRecipe);

module.exports = ingredientRouter;