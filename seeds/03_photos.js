
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('photos').del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert([
        {author_id: 2, link: 'https://bit.ly/2PQfA0N', title: `Burro’s Tail (sedum morganianum)`, description: `Sedum morganianum grows well outside or indoors, in very good light but not extreme heat. The plant is best grown in full sunlight for strong growth and to enhance leaf coloration. It requires regular, moderate watering all year, except in winter, when it should be infrequently watered. Excess water can damage the plant in a short time.`},
        {author_id: 1, link: 'https://bit.ly/2Lrg8vu', title: 'Jade Plant (crassula ovata)', description: `The jade plant is an evergreen with thick branches. It has thick, shiny, smooth leaves that grow in opposing pairs along the branches. Leaves are a rich jade green, although some may appear to be more of a yellow-green. Some varieties may develop a red tinge on the edges of leaves when exposed to high levels of sunlight.`},
        {author_id: 1, link: 'https://bit.ly/2J5c2qQ', title: 'Ghost Plant (graptopetalum paraguayense)', description: `Ghost plant (Graptopetalum paraguayense) is a cold-hardy succulent with pale gray or whitish leaves on sprawling stems. Its versatile growth will help it stand out in your landscape as an unusual groundcover, cascading down a container, or even as a houseplant.`},
        {author_id: 3, link: 'https://bit.ly/2VjHg4e', title: 'Roseum (sedum spurium)', description: `The roseum plant is a low-growing succulent that only gets to be about four to six inches tall. It is a fast grower that works great in containers or planters on a windowsill. In the summer, the roseum develops clusters of light-pink star flowers that can add a pop of color to your home decor. `},
        {author_id: 2, link: 'https://bit.ly/2PPirXK', title: 'Echeveria Purpusorum', description: `This dark green succulent has red spots on its leaves. The leaves can be brown, green, or red depending on the amount of sunlight it receives.  This succulent is very slow-growing, and therefore doesn’t bloom often. Watch for reddish-orange flowers on a tall stem.`}
      ]);
    });
};
