const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs')
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const gallery = require('./routes/gallery.js');
const PORT = 3000;

// app.engine(
//   '.hbs',
//   exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     layoutsDir: __dirname + '/views/layouts/',
//     partialsDir: __dirname + '/views/partials/',
//   }),
// );
// app.set('view engine', '.hbs');

app.use(methodOverride('_method'));
// app.use(express.static('public'));

app.use('/gallery', gallery);


app.get('/', (req, res) => {
  res.send('smoke test');
});


const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});