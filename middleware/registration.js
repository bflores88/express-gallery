'use strict';

module.exports = function(req, res, next) {
  let userName = req.body.username;
  let userNameLength = userName.length;
  let userPass = req.body.password;
  let userPassLength = userPass.length;
  if(userNameLength <= 18 && userNameLength >= 3 && userPass.indexOf('\s') !== -1){

    if(userPassLength >= 6 && userPassLength <= 20){
      return next();
    } else {
      req.flash('error', 'Password must be between 6 and 20 characters in length.')
      return res.redirect(302, '/register')
    }

  } else {
    req.flash('error', 'Username must be between 3 and 18 characters in length and not contain spaces.');
    return res.redirect(302, '/register')
  }
};