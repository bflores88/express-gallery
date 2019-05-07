const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Photo = require('../database/models/Photo');


router.route('/')
  .get((req, res) => {
    let currentUser = req.user.id;
    //view list of gallery photos
    return new Photo()
    // .where('author_id', req.user.id)
    .orderBy('created_at', 'DESC')
    .fetchAll()
    .then((result) => {
      let allPlants = result.models;
      let context = fillGallery(currentUser, allPlants);
      res.render('layouts/all_users/gallery', context);
    })
    .catch((err) => {
      res.send('{ message: Database Error');
    })


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

function fillGallery(userID, photoArray){
  let subPhotos = [];

  photoArray.forEach((photoObject) => {
    let subPhotoObject = {};
    subPhotoObject.id = photoObject.get('id');
    subPhotoObject.url = photoObject.get('link');
    subPhotoObject.title = photoObject.get('title');
    subPhotoObject.author_id = photoObject.get('author_id');

    if(photoObject.get('author_id') === userID){
      subPhotoObject.display = 'flex';
    } else {
      subPhotoObject.display = 'none';
    }

    subPhotos.push(subPhotoObject);
  })

  let first = subPhotos.splice(0, 1);
  let context = first[0];
  context.photo = subPhotos;

  return context;
}


module.exports = router;