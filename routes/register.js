'use strict';

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
        //maybe if have time log the error to an error log??
        return res.redirect(302, '/internalError');
      }

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
          //maybe if have time log the error to an error log??
          return res.redirect(302, '/internalError');
        }

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
            //maybe if have time log the error to an error log??
            return res.redirect(302, '/internalError');
          });
      });
    });
  });

module.exports = router;
