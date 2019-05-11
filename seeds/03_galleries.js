
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('galleries').del()
    .then(function () {
      // Inserts seed entries
      return knex('galleries').insert([
        {user_id: 2, author: 'Krista Mangulsone', link: 'https://bit.ly/2VwSQJh', title: `Real life best friends`, description: `white dog and gray cat hugging each other on grass`},
        {user_id: 1, author: 'ipet photo', link: 'https://bit.ly/2HgOJXW', title: 'untitled', description: `best friends forever.`},
        {user_id: 1, author: 'freestocks.org', link: 'https://bit.ly/2VVw518', title: 'Woman holds sleeping puppy', description: `selective focus photography of puppy on sweater`}
      ]);
    });
};
