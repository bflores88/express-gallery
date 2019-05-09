const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = 12;

router
  .route('/')
  .get((req, res) => {
    return res.status(200).render('layouts/register');
  })
  .post((req, res) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) {
        console.log(err);
      } //return 500

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        } //return 500

        return new User({
          username: req.body.username,
          password: hash,
          role_id: 2,
        })
          .save()
          .then((user) => {
            console.log(user);
            return res.redirect(302, '/login');
          })
          .catch((err) => {
            console.log(err);
            return res.send('Error creating account');
          });
      });
    });
  });

module.exports = router;
