'use strict';

//check the input lengths on forms

module.exports = function(req, res, next) {
  let author = req.body.author;
  let title = req.body.title;
  let description = req.body.description;

  if(author.length > 100){
    req.flash('error', 'Author must be 100 characters or less.');
    return res.redirect(302, `/gallery/${req.params.id}/edit`)
  }

  if(title.length > 100){
    req.flash('error', 'Title must be 100 characters or less.')
    return res.redirect(302, `/gallery/${req.params.id}/edit`)
  }

  if(description.length > 500){
    req.flash('error', 'Description must be 100 characters or less.')
    return res.redirect(302, `/gallery/${req.params.id}/edit`)
  }

  return next();
};