const db = require('../data/connection.js');

module.exports = {
  findByRecipe,
  add,
};

function findByRecipe(id) {
  return db('instructions as i')
    .join('recipes as r', 'r.id', 'i.recipe_id')
    .select('i.instruction')
    .where('r.id', id)
    .orderBy('i.id');
}

function add(instruction) {
  return db('instructions').insert(instruction);
}
