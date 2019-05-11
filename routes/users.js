'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.route('/:id').get((req, res) => {
  new Gallery('user_id', req.user.id)
    .orderBy('updated_at', 'DESC')
    .fetchAll()
    .then((result) => {
      const userGallery = result.toJSON();

      let context = {
        username: req.user.username,
        user_id: req.user.id,
        userImage: getImages(userGallery),
      };
      return res.status(200).render('layouts/all_users/user-gallery', context);
    })
    .catch((err) => {
      console.log('err', err);
    });
});

function getImages(userJSON) {
  let userImage = [];

  userJSON.forEach((image) => {
    let updatedAt = image.updated_at;
    let imageObject = {
      id: image.id,
      link: image.link,
      author: image.author,
      updated_at: updatedAt.toDateString(),
    };
    userImage.push(imageObject);
  });

  return userImage;
}

module.exports = router;
