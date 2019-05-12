'use strict';

const express = require('express');
const router = express.Router();
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router
  .route('/')
  .get((req, res) => {
    let currentUser = req.user.id;

    return new Gallery()
      .orderBy('created_at', 'DESC')
      .fetchAll()
      .then((result) => {
        let allPlants = result.models;
        let context = fillGallery(currentUser, allPlants);
        return res.status(200).render('layouts/all_users/gallery', context);
      })
      .catch((err) => {
        //maybe if have time log the error to an error log??
        return res.redirect(302, '/internalError');
      });
  })
  .post((req, res) => {
    let user_id = req.user.id;
    let author = req.body.author;
    let title = req.body.title;
    let link = req.body.link;
    let description = req.body.description;

    new Gallery({ user_id: user_id, author: author, title: title, link: link, description: description })
      .save()
      .then((result) => {
        return res.redirect(302, '/gallery');
      })
      .catch((err) => {
        //maybe if have time log the error to an error log??
        return res.redirect(302, '/internalError');
      });
  });

router.route('/new').get((req, res) => {
  let context = { user_id: req.user.id };
  return res.status(200).render('layouts/all_users/new', context);
});

router
  .route('/:id')
  .get((req, res) => {
    new Gallery()
      .where({ id: req.params.id })
      .fetch({ withRelated: ['users'] })
      .then((result) => {
        let resultObject = result.toJSON();
        let userObject = resultObject.users;
        let displayStyle = 'none';

        if (resultObject.user_id === req.user.id || req.user.role === 1) {
          displayStyle = 'flex';
        }

        const context = {
          title: resultObject.title,
          author: resultObject.author,
          username: userObject.username,
          link: resultObject.link,
          description: resultObject.description,
          display: displayStyle,
          id: resultObject.id,
          thisUser_id: userObject.id
        };

        return context;
      })
      .then((context) => {
        new Gallery()
          .query((qb) => {
            qb.orderByRaw('RANDOM()');
          })
          .fetchAll()
          .then((result) => {
            let galleryObject = result.toJSON();
            context.photo = fillSideGallery(galleryObject, req.user.id, req.user.role);

            return res.status(200).render('layouts/all_users/single', context);
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
  })
  .delete((req, res) => {
    new Gallery({ id: req.params.id })
      .destroy()
      .then((result) => {
        return res.redirect(302, '/gallery');
      })
      .catch((err) => {
        //maybe if have time log the error to an error log??
        return res.redirect(302, '/internalError');
      });
  })
  .put((req, res) => {
    new Gallery('id', req.params.id)
      .save({
        user_id: req.user.id,
        author: req.body.author,
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
      })
      .then((result) => {
        return res.redirect(302, `/gallery/${Number(req.params.id)}`);
      })
      .catch((err) => {
        //maybe if have time log the error to an error log??
        return res.redirect(302, '/internalError');
      });
  });

router.route('/:id/edit').get((req, res) => {
  new Gallery()
    .where('id', req.params.id)
    .fetch()
    .then((result) => {
      let context = {
        title: result.get('title'),
        author: result.get('author'),
        link: result.get('link'),
        description: result.get('description'),
        id: result.get('id'),
        user_id: req.user.id
      };

      return res.status(200).render('layouts/all_users/edit', context);
    })
    .catch((err) => {
      //maybe if have time log the error to an error log??
      return res.redirect(302, '/internalError');
    });
});

function fillGallery(userID, photoArray) {
  let subPhotos = [];

  photoArray.forEach((photoObject) => {
    let subPhotoObject = {};
    subPhotoObject.id = photoObject.get('id');
    subPhotoObject.url = photoObject.get('link');
    subPhotoObject.title = photoObject.get('title');
    subPhotoObject.user_id = photoObject.get('user_id');

    if (photoObject.get('user_id') === userID) {
      subPhotoObject.thisUser = true;
    } else {
      subPhotoObject.thisUser = false;
    }

    subPhotos.push(subPhotoObject);
  });

  let first = subPhotos.splice(0, 1);
  let context = first[0];
  context.photo = subPhotos;

  let reversed = [];

  for (let i = subPhotos.length - 1; i >= 0; i--) {
    reversed.push(subPhotos[i]);
  }
  context.otherPhoto = reversed;
  return context;
}

function fillSideGallery(galleryArray, userID, roleID) {
  galleryArray.map((photoObject) => {
    if (photoObject.user_id === userID || roleID === 1) {
      photoObject.thisUser = true;
      photoObject.thisUser_id = photoObject.user_id;
    } else {
      photoObject.thisUser = false;
      photoObject.thisUser_id = photoObject.user_id;
    }
  });

  return galleryArray;
}

module.exports = router;
