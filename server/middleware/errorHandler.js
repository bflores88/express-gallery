'use strict';

//check the input lengths on forms

module.exports = function(err, req, res, next) {
  console.log('error', err);
  return res.redirect(302, '/internalError');
}