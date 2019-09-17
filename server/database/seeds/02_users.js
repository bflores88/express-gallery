const bcrypt = require('bcryptjs');
const saltRounds = 12;

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'artsy-cat',
          password: bcrypt.hashSync('meowmix', saltRounds),
          role_id: 1,
        },
        {
          username: 'fancy-cat',
          password: bcrypt.hashSync('meowmix', saltRounds),
          role_id: 2,
        },
        {
          username: 'funny-cat',
          password: bcrypt.hashSync('meowmix', saltRounds),
          role_id: 2,
        },
      ]);
    });
};
