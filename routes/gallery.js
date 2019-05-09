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
        res.render('layouts/all_users/gallery', context);
      })
      .catch((err) => {
        res.send('{ message: Database Error');
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
        console.log('error', err);
        return res.status(500).send('{ message: error }');
      });
  });

router.route('/new').get((req, res) => {
  res.render('layouts/all_users/new');
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

        if (result.get('user_id') === req.user.id) {
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
            context.photo = fillSideGallery(galleryObject, req.user.id);

            return res.status(200).render('layouts/all_users/single', context);
          });
      });
  })
  .delete((req, res) => {
    new Gallery({ id: req.params.id }).destroy().then((result) => {
      return res.redirect(302, '/gallery');
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
      };

      res.render('layouts/all_users/edit', context);
    });

  //see a form to edit a gallery phot
  //show form fields author, link, description
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

function fillSideGallery(galleryArray, userID) {
  galleryArray.map((photoObject) => {
    if (photoObject.user_id === userID) {
      photoObject.thisUser = true;
    } else {
      photoObject.thisUser = false;
    }
  });

  return galleryArray;
}

module.exports = router;
