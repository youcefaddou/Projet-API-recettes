const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        minlength: [2, "Title must be at least 2 characters long"],
        maxlength: [100, "Title cannot exceed 100 characters"]
    },
    instructions: {
        type: String,
        required: [true, "Instructions are required"],
        trim: true
    },
    prepareTime: {
        type: String,
        trim: true
    },
    cookingTime: {
        type: String,
        trim: true
    },
    ingredients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ingredients'
        }
    ]
});

const recipeModel = mongoose.model('recipes', recipeSchema);

module.exports = recipeModel;

