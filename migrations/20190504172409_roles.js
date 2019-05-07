
exports.up = function(knex, Promise) {
  return knex.schema.createTable('roles', (table) => {
    table.increments();
    table.string('role', 255).notNullable();
  });
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('roles');
};
