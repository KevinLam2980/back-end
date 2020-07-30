const db = require('../data/connection.js');

module.exports = {
  findByRecipe,
  add,
  update,
};

function findByRecipe(id) {
  return db('instructions as i')
    .join('recipes as r', 'r.id', 'i.recipe_id')
    .select('i.id', 'i.instruction')
    .where('r.id', id)
    .orderBy('i.id');
}

function findById(id) {
  return db('instructions').where('id', id).select('id', 'instruction').first();
}

function add(instruction) {
  return db('instructions')
    .insert(instruction, 'id')
    .then((id) => {
      return findById(id[0]);
    });
}

function update(id, changes) {
  return db('instructions')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
