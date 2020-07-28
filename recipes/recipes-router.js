const express = require('express');
const router = require('express').Router();
const Recipes = require('./recipes-model.js');
const { restart } = require('nodemon');

router.use(express.json());

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

router.delete('/:id', (req, res) => {
  console.log(req.jwt.subject);
  // Need to figure out how to compare the user's id to the associated ID on the recipe

  //   Recipes.remove(req.params.id)
  //     .then((count) => {
  //       if (count) {
  //         res.status(204).end();
  //       } else {
  //         res
  //           .status(404)
  //           .json({ message: 'Could not find a recipe with that id.' });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ message: 'Failed to delete recipe' });
  //     });
});

module.exports = router;
