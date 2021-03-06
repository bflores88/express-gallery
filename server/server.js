const express = require('express');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const methodOverride = require('method-override');
const guard = require('./middleware/guard');
const errorHandler = require('./middleware/errorHandler');
const bcrypt = require('bcryptjs');
const redis = require('connect-redis')(session);
const flash = require('connect-flash');

const User = require('./database/models/User');
const Gallery = require('./database/models/Gallery');

const register = require('./routes/register.js');
const login = require('./routes/login.js');
const gallery = require('./routes/gallery.js');
const users = require('./routes/users.js');

const PORT = 3000;

require('dotenv').config();

const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../', '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(flash());
app.use(errorHandler);
app.use(
	session({
		store: new redis({ url: process.env.REDIS_URL }),
		secret: process.env.REDIS_SECRET,
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(methodOverride('_method'));

app.engine(
	'.hbs',
	exphbs({
		defaultLayout: 'main',
		extname: '.hbs',
		layoutsDir: path.join(__dirname, '../', '/views/layouts'),
		partialsDir: path.join(__dirname, '../', '/views/partials'),
	}),
);
app.set('view engine', '.hbs');

app.get('/goodbye', (req, res) => {
	return res.status(200).render('layouts/goodbye');
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
	new LocalStrategy(function(username, password, done) {
		return new User({ username: username })
			.fetch()
			.then((user) => {
				if (user === null) {
					return done(null, false, { message: 'bad username or password' });
				} else {
					user = user.toJSON();

					bcrypt
						.compare(password, user.password)
						.then((res) => {
							//Happy route: username exists, password matches
							if (res) {
								return done(null, user);
							}

							//Error route: Username exists, password does not match
							else {
								return done(null, false, { message: 'bad username or password' });
							}
						})
						.catch((err) => {
							console.log('err', err);
							return done(err);
						});
				}
			})
			.catch((err) => {
				console.log('err', err);
				return done(err);
			});
	}),
);

passport.serializeUser(function(user, done) {
	console.log('serializing');
	return done(null, { id: user.id, username: user.username, role: user.role_id });
});

passport.deserializeUser(function(user, done) {
	console.log('deserializing');

	return new User({ id: user.id })
		.fetch()
		.then((user) => {
			user = user.toJSON();

			done(null, {
				id: user.id,
				username: user.username,
				email: user.email,
				role: user.role_id,
			});
		})
		.catch((err) => {
			console.log('err', err);
			return done(err);
		});
});

app.get('/', (req, res, next) => {
	new Gallery()
		.count('id')
		.then((idCount) => {
			let random = Math.floor(Math.random() * idCount);

			new Gallery('id', random)
				.fetch()
				.then((result) => {
					let randomPhoto = result.toJSON();
					randomPhoto.message = req.flash('error');
					return res.render('layouts/home', randomPhoto);
				})
				.catch((err) => {
					return next(err);
				});
		})
		.catch((err) => {
			return next(err);
		});
});

app.use('/register', register);
app.use('/login', login);

app.get('/internalError', (req, res) => {
	return res.status(500).render('layouts/500');
});

app.use(guard, (req, res, next) => {
	next();
});

app.use('/gallery', gallery);
app.use('/users', users);

app.get('/delete', (req, res) => {
	let context = {
		user_id: req.user.id,
	};
	return res.status(200).render('layouts/all_users/user-delete', context);
});

app.get('/logout', (req, res) => {
	req.logout();
	return res.redirect('/');
});

const server = app.listen(PORT, () => {
	console.log(`Express app is running at port ${PORT}`);
});
