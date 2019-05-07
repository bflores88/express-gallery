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

const User = require('./database/models/User');
const Photo = require('./database/models/Photo');

const gallery = require('./routes/gallery.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

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

app.use('/gallery', gallery);
app.use('/register', register);
app.use('/login', login);

app.get('/', (req, res) => {
  res.render('layouts/home');
});


passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then((user) => {
        console.log(user);

        if (user === null) {
          return done(null, false, { message: 'bad username or password' });
        } else {
          user = user.toJSON();

          //Happy route: username exists, password matches
          if (user.password === password) {
            return done(null, user);
          }

          //Error route: Username exists, password does not match
          else {
            return done(null, false, { message: 'bad username or password' });
          }
        }
      })
      .catch((err) => {
        console.log('error: ', err);
        return done(err);
      });
  }),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log('deserializing');
  console.log(user);

  return new User({id: user.id})
  .fetch()
  .then((user) => {
    user = user.toJSON();

    done(null, {
      id: user.id,
      username: user.username,
      email: user.email
    })
  })
});





const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});