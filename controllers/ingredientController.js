const ingredientModel = require('../models/ingredientModel');
const recipeModel = require('../models/recipeModel');

exports.postIngredient = async (req, res) => {
    try {
        const ingredient = new ingredientModel({
            name: req.body.name,
            quantity: req.body.quantity
        });
        await ingredient.save();
        res.status(201).json({
            message: 'Ingredient created successfully',
            ingredient: ingredient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating ingredient',
            error: error.message
        });
    }
}

exports.getIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientModel.find();
        res.status(200).json(ingredients);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching ingredients',
            error: error.message 
        });
    }
}

exports.getIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientModel.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json(ingredient);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching ingredient',
            error: error.message 
        });
    }
}

exports.updateIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { runValidators: true, new: true }
        );
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json({
            message: 'Ingredient updated successfully',
            ingredient: ingredient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating ingredient',
            error: error.message
        });
    }
}

exports.deleteIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientModel.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting ingredient',
            error: error.message
        });
    }
}

exports.postIngredientbyRecipe = async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const recipeId = req.params.id;

        // Vérifier si la recette existe
        const recipe = await recipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const newIngredient = new ingredientModel({
            name,
            quantity,
            recipe: recipeId
        });
        
        await newIngredient.save();
        await recipeModel.findByIdAndUpdate(
            recipeId, 
            { $push: { ingredients: newIngredient._id } }, 
            { new: true }
        );

        res.status(201).json({
            message: 'Ingredient added to recipe successfully',
            ingredient: newIngredient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error adding ingredient to recipe',
            error: error.message
        });
    }
}

exports.getIngredientsbyRecipe = async (req, res) => {
    try {
        const recipeId = req.params.id;
        const recipe = await recipeModel.findById(recipeId).populate('ingredients');
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        res.status(200).json({
            message: 'Ingredients retrieved successfully',
            ingredients: recipe.ingredients
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving ingredients',
            error: error.message
        });
    }
}

exports.deleteIngredientbyRecipe = async (req, res) => {
    try {
        const { recipeId, ingredientId } = req.params;

        // Vérifier si la recette existe
        const recipe = await recipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Vérifier si l'ingrédient existe
        const ingredient = await ingredientModel.findById(ingredientId);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        // Supprimer l'ingrédient
        await ingredientModel.findByIdAndDelete(ingredientId);
        
        // Retirer l'ingrédient de la recette
        await recipeModel.findByIdAndUpdate(
            recipeId, 
            { $pull: { ingredients: ingredientId } }, 
            { new: true }
        );

        res.status(200).json({
            message: 'Ingredient removed from recipe successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error removing ingredient from recipe',
            error: error.message
        });
    }
}

exports.updateIngredientbyRecipe = async (req, res) => {
    try {
        const { recipeId, ingredientId } = req.params;

        // Vérifier si la recette existe
        const recipe = await recipeModel.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        // Vérifier si l'ingrédient existe
        const ingredient = await ingredientModel.findById(ingredientId);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        // Mettre à jour l'ingrédient
        const updatedIngredient = await ingredientModel.findByIdAndUpdate(
            ingredientId,
            req.body,
            { runValidators: true, new: true }
        );

        res.status(200).json({
            message: 'Ingredient updated successfully',
            ingredient: updatedIngredient
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating ingredient',
            error: error.message
        });
    }
}
