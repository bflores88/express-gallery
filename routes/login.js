'use strict';

const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const passport = require('passport');


router.route('/')
  .get((req, res) => {
    return res.status(200).render('layouts/login');
  })

router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/login',
  }),
);


  module.exports = router;