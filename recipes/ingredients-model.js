const db = require('../data/connection.js');

module.exports = {
  findByRecipe,
  add,
  update,
};

function findByRecipe(id) {
  return db('ingredients as i')
    .join('recipes as r', 'r.id', 'i.recipe_id')
    .select('i.id', 'i.ingredient')
    .where('r.id', id)
    .orderBy('i.id');
}

function findById(id) {
  return db('ingredients').where('id', id).select('id', 'ingredient').first();
}

function add(ingredient) {
  return db('ingredients')
    .insert(ingredient, 'id')
    .then((id) => {
      return findById(id[0]);
    });
}

function update(id, changes) {
  return db('ingredients')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
