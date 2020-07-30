const db = require('../data/connection.js');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('recipes');
}

function findById(id) {
  return db('recipes').where({ id }).first();
}

function add(recipe) {
  return db('recipes')
    .insert(recipe, 'id')
    .then(([id]) => findById(id));
}

function update(changes, id) {
  return db('recipes')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function remove(id) {
  return db('recipes').where({ id }).delete();
}
