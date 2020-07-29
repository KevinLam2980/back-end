exports.up = function (knex) {
  return knex.schema
    .createTable('recipes', (tbl) => {
      tbl.increments();
      tbl.text('name', 256).notNullable();
      tbl.text('category', 128).notNullable();
      tbl.text('source', 128).notNullable();
      tbl.text('imageURL', 256);
      tbl
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('ingredients', (tbl) => {
      tbl.increments();
      tbl.text('ingredient', 128).notNullable();
      tbl
        .integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
    .createTable('instructions', (tbl) => {
      tbl.increments();
      tbl.text('instruction', 450).notNullable();
      tbl
        .integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('recipes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('instructions')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('recipes');
};
