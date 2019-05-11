'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.route('/:id')
  .get((req, res) => {
    new Gallery('user_id', req.user.id)
    .fetch()
    .then((result) => {
      const userGallery = result.toJSON();
      console.log(userGallery);
      return res.send('hi mkkkkkkkk hih ihi hi h')
    })
    .catch((err) => {
      console.log('err', err)
    })
  })

module.exports = router;