'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.route('/:id')
  .get((req, res) => {
    res.send('COMING SPOON!')
  })

module.exports = router;