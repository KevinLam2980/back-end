const db = require('../data/connection.js');

module.exports = {
  findByRecipe,
};

function findByRecipe(id) {
  return db('ingredients as i')
    .join('recipes as r', 'r.id', 'i.recipe_id')
    .select('i.ingredient')
    .where('r.id', id)
    .orderBy('i.id');
}
