require('dotenv').config(); // pour utiliser les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const recipeRouter = require('./routers/recipeRouter');
const ingredientRouter = require('./routers/ingredientRouter');

const app = express();
app.use(express.json());

// Montage des routeurs
app.use(recipeRouter);
app.use(ingredientRouter);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(`Connecté au server sur le port ${process.env.PORT}`);
    }
});

mongoose.connect(process.env.URL_BDD)
    .then(() => console.log('Connecté à la base de données'))
    .catch(err => console.error('Erreur de connexion à la base de données:', err));
