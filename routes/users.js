'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.route('/:id').get((req, res) => {
  new Gallery()
    .where('user_id', req.params.id)
    .orderBy('updated_at', 'DESC')
    .fetchAll()
    .then((result) => {
      const userGallery = result.toJSON();
      let context = {
        userImage: getImages(userGallery),
      };

      return context;
    })
    .then((context) => {
      new User('id', req.params.id)
        .fetch()
        .then((userResult) => {
          let userInfo = userResult.toJSON();
          context.username = userInfo.username;
          context.user_id = req.user.id;

          return res.status(200).render('layouts/all_users/user-gallery', context);
        })
        .catch((err) => {
          //maybe if have time log the error to an error log??
          return res.redirect(302, '/internalError');
        });
    })
    .catch((err) => {
      //maybe if have time log the error to an error log??
      return res.redirect(302, '/internalError');
    });
});

function getImages(userJSON, userID) {
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
