const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"]
    },
    quantity: {
        type: String,
        required: [true, "Quantity is required"],
        trim: true
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recipes'
    }
});

const ingredientModel = mongoose.model('ingredients', ingredientSchema);

module.exports = ingredientModel;

