const Recipes = require('./recipes-model.js');
const db = require('../data/connection.js');

describe('recipes model', () => {
  describe('find method', () => {
    beforeEach(async () => {
      await db('recipes').truncate();
      await Recipes.add({
        name: 'Southern-Style Egg Salad',
        source: 'Walter',
        category: 'Sandwich',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
        user_id: 1,
      });
      await Recipes.add({
        name: 'Honey Chicken Kabobs',
        source: 'Ann Marie',
        category: 'Grill',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
        user_id: 2,
      });
    });

    it('should find a list of all recipes', async () => {
      const recipes = await Recipes.find();
      //   expect(recipes).toHaveLength(4);
      expect(recipes).toHaveLength(2);
    });
  });

  describe('findById method', () => {
    beforeEach(async () => {
      await db('recipes').truncate();
      await Recipes.add({
        name: 'Southern-Style Egg Salad',
        source: 'Walter',
        category: 'Sandwich',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
        user_id: 1,
      });
      await Recipes.add({
        name: 'Honey Chicken Kabobs',
        source: 'Ann Marie',
        category: 'Grill',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
        user_id: 2,
      });
    });

    it('should find the provided recipe in the database', async () => {
      const recipe = await Recipes.findById(1);
      //   expect(recipe.id).toEqual(2);
      expect(recipe.id).toEqual(1);
    });
  });

  describe('add method', () => {
    beforeEach(async () => {
      await db('recipes').truncate();
    });

    it('should add a recipe to the database', async () => {
      const recipe = await Recipes.add({
        name: 'Southern-Style Egg Salad',
        source: 'Walter',
        category: 'Sandwich',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F8100470.jpg',
        user_id: 1,
      });
      const recipes = await db('recipes');
      //   expect(recipes).toHaveLength(2);
      expect(recipes).toHaveLength(1);
    });
  });

  describe('delete method', () => {
    beforeEach(async () => {
      await db('recipes').truncate();
      await Recipes.add({
        name: 'Honey Chicken Kabobs',
        source: 'Ann Marie',
        category: 'Grill',
        imageURL:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F1403054.jpg&w=596&h=596&c=sc&poi=face&q=85',
        user_id: 2,
      });
    });

    it('should delete a recipe from the database', async () => {
      await Recipes.remove(1);
      const recipes = await db('recipes');
      //   expect(recipes).toHaveLength(1);
      expect(recipes).toHaveLength(0);
    });
  });
});
