
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'fancy cat', password: 'meowmeow1', role_id: 1},
        {username: 'funny cat', password: 'meowmeow2', role_id: 2},
        {username: 'artsy cat', password: 'meowmeow3', role_id: 2 }
      ]);
    });
};
