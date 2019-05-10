'use strict';

const express = require('express');
const User = require('../database/models/User');
const router = express.Router();
const passport = require('passport');


router.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/gallery',
    failureRedirect: '/',
  }),
);


  module.exports = router;