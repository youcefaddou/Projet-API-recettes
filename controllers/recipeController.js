const recipeModel = require('../models/recipeModel');

exports.postRecipe = async (req, res) => {
    try {
        const recipe = new recipeModel({
            title: req.body.title,
            instructions: req.body.instructions,
            prepareTime: req.body.prepareTime,
            cookingTime: req.body.cookingTime,
            difficulty: req.body.difficulty,
            category: req.body.category,
            ingredients: req.body.ingredients || []
        });

        if (req.file) {
            recipe.image = req.file.filename;
        }

        await recipe.save();
        
        const recipeWithIngredients = await recipeModel.findById(recipe._id).populate('ingredients');

        res.status(201).json({
            message: 'Recipe created successfully',
            recipe: recipeWithIngredients
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error creating recipe',
            error: error.message
        });
    }
}

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await recipeModel.find().populate('ingredients');
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching recipes',
            error: error.message 
        });
    }
}

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel.findById(req.params.id).populate('ingredients');
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching recipe',
            error: error.message 
        });
    }
}

exports.updateRecipe = async (req, res) => {
    try {
        const updateData = {
            title: req.body.title,
            instructions: req.body.instructions,
            prepareTime: req.body.prepareTime,
            cookingTime: req.body.cookingTime,
            difficulty: req.body.difficulty,
            category: req.body.category
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        const recipe = await recipeModel.findByIdAndUpdate(
            req.params.id, 
            updateData,
            { new: true }
        ).populate('ingredients');
        
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        
        res.status(200).json({
            message: 'Recipe updated successfully',
            recipe: recipe
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error updating recipe',
            error: error.message
        });
    }
}

exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await recipeModel.findByIdAndDelete(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(500).json({
            message: 'Error deleting recipe',
            error: error.message
        });
    }
}