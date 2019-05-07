const express = require('express');
const User = require('../database/models/User');
const router = express.Router();


router.route('/')
  .get((req, res) => {
    return res.status(200).render('layouts/register')
  })
  .post((req, res) => {
    return new User({
      username: req.body.username,
      password: req.body.password,
      role_id: 2
    })
    .save()
    .then((user) => {
      console.log(user)
      return res.redirect(302, '/')
    })
    .catch((err) => {
      console.log(err);
      return res.send('Error creating account');
    })
  })

module.exports = router;
