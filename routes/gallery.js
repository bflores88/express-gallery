const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.send('smoke test 2 GET /')
    //view list of gallery photos
  })
  .post((req, res) => {
    res.send('smoke test 4 POST /')
    //create a new gallery photo
  })

router.route('/new')
  .get((req, res) => {
    res.send('smoke test 4 /new')
    //form to POST new gallery photo
    //form fields consume author, link, description
  })

router.route('/:id')
  .get((req, res) => {
    res.send('smoke test 3 GET /:id')
    //see a single gallery photo
    //include a link to delete this gallery photo
    //include a link to edit this gallery photo
  })
  .put((req, res) => {
    res.send('smoke test 5 PUT /:id')
    //update gallery photo by :id param
  })
  .delete((req, res) => {
    res.send('smoke test 6 DELETE /:id')
    //delete gallery photo by :id param
  })

router.route('/:id/edit')
  .get((req, res) => {
    res.send('smoke test 4 GET /:id/get')
    //see a form to edit a gallery phot
    //show form fields author, link, description
  })


module.exports = router;