'use strict';

const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 12;
const registration = require('../middleware/registration');

router
	.route('/')
	.get((req, res) => {
		return res.status(200).render('layouts/register', { message: req.flash('error') });
	})
	.post(registration, (req, res, next) => {
		new User('username', req.body.username)
			.fetch()
			.then((userObject) => {
				if (userObject !== null) {
					req.flash('error', 'That username already exists!');
					return res.redirect(302, '/register');
				}

				return bcrypt.genSalt(saltRounds, (err, salt) => {
					if (err) {
						console.log(err);
						return res.redirect(302, '/internalError');
					}

					bcrypt.hash(req.body.password, salt, (err, hash) => {
						if (err) {
							console.log(err);
							return res.redirect(302, '/internalError');
						}

						return new User({
							username: req.body.username,
							password: hash,
							role_id: 2,
						})
							.save()
							.then((user) => {
								return res.redirect(302, '/');
							})
							.catch((err) => {
								return res.redirect(302, '/internalError');
							});
					});
				});
			})
			.catch((err) => {
				return next(err);
			});
	});

module.exports = router;
