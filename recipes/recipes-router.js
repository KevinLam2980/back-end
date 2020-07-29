const express = require('express');
const router = require('express').Router();
const Recipes = require('./recipes-model.js');

router.use(express.json());

const validateId = require('../middleware/validateRecipeById.js');

router.get('/', (req, res) => {
  Recipes.find()
    .then((recipes) => {
      res.status(200).json({ data: recipes });
    })
    .catch((err) =>
      res.status(500).json({ message: 'Failed to get recipe list.' })
    );
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Recipes.findById(id).then((recipe) => {
    if (recipe) {
      res.status(200).json({ data: recipe });
    } else {
      res
        .status(404)
        .json({ message: 'Could not find a recipe with that id.' });
    }
  });
});

router.post('/', (req, res) => {
  const recipeData = req.body;
  recipeData.user_id = req.jwt.subject;
  Recipes.add(recipeData)
    .then((recipe) => {
      res.status(201).json({ data: recipe });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to create a new recipe.' });
    });
});

router.delete('/:id', validateId, (req, res) => {
  Recipes.remove(req.params.id)
    .then((count) => {
      if (count) {
        res.status(204).json({ message: 'This recipe has been deleted.' });
      } else {
        res
          .status(404)
          .json({ message: 'Could not find a recipe with that id.' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Failed to delete recipe' });
    });
});

module.exports = router;
