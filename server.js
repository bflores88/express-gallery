const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const fs = require('fs')
const methodOverride = require('method-override');
const guard = require('./middleware/guard');

const gallery = require('./routes/gallery.js');

const app = express();
const PORT = 3000;

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
  }),
);
app.set('view engine', '.hbs');

app.use(methodOverride('_method'));
app.use(express.static('public'));

app.use('/gallery', gallery)

app.get('/', (req, res) => {
  res.render('layouts/home');
});


const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});