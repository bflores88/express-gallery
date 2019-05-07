const express = require('express');
const router = express.Router();

router.route('/')
  .get((req,res) => {
    return res.status(200).render('layouts/login');
  })
  .post((req, res) => {





  })


module.exports = router;