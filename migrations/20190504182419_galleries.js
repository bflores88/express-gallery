
exports.up = function(knex, Promise) {
  return knex.schema.createTable('galleries', (table) => {
    table.increments();
    table.integer('user_id').references('id').inTable('users').notNullable();
    table.text('author').notNullable();
    table.text('link').notNullable();
    table.text('title').notNullable();
    table.text('description').notNullable();
    table.timestamps(true, true)
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('galleries');
};