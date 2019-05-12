'use strict';

const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const passport = require('passport');


router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/gallery',
    failureFlash: 'Invalid username or password.',
    failureRedirect: '/',
  }),
);


  module.exports = router;