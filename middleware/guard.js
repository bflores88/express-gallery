'use strict';

module.exports = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error', 'You must be logged in to view this page!')
    return res.redirect('/');
  }
};