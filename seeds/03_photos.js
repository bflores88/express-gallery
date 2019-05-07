
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {author_id: 2, link: 'https://cnn.it/2LqiomH', title: 'Fish Building', description: `Built in 2012, the giant fish-shaped building looks like it is swimming in mid-air. Rectangular scale-like windows puncture its silver body, while a hollow mouth has been punched into the front and it has blue glass for eyes. Its address, according to Google, is the "Fish Building."
        The three-story, 1,920-square-meter structure was designed this way by the Central Public Works Department of India for the simple reason that the work done inside relates to fishing.`},
        {author_id: 1, link: 'https://bit.ly/2POX2xW', title: 'Cat Shaped School', description: `Situated in the German village of Wolfartsweier, the feline kindergarten hosts around a hundred children who enter through the mouth, take classes in the head – with light pouring in through the eyes – and who can make their way to the playground at the back via the tail or rather a silver slide. It is a rare example of when so-called novelty architecture has been created with the purpose not only of delighting the eye, but also with a specific practical purpose.`},
        {author_id: 2, link: 'https://bit.ly/2Jku3Rf', title: 'The Piano House', description: `Located in Anhua, China.`},
        {author_id: 3, link: 'https://bit.ly/2J6jx0P', title: 'The Shoe', description: `The South African shoe house, in Mpumalanga Province was built in 1990 by entrepreneur and artist Ron Van Zyl, is one of the many shoe-shaped houses in the world. The interior and architecture is a museum of rock and wood carvings made by Van Zyl himself. The Shoe is part of a bigger project, which includes a camp site and a chalet guest house, a restaurant, a bar, a pool and a shop.`},
        {author_id: 3, link: 'https://bit.ly/2J6k6rt', title: 'The Interlace', description: `The Interlace is a condominium in Singapore that has won multiple awards for its architectural splendour which features 31 blocks of apartments stacked (or laced, if you will) in a hexagonal arrangement. Notable awards include World Building of The Year in 2015 and the Urban Habitat Award in 2014.`}
      ]);
    });
};
