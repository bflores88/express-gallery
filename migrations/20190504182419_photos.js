
exports.up = function(knex, Promise) {
  return knex.schema.createTable('photos', (table) => {
    table.increments();
    table.integer('author_id').references('id').inTable('users').notNullable();
    table.text('link').notNullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('photos');
};