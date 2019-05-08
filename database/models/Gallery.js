const bookshelf = require('../bookshelf');

// require('./User')
class Gallery extends bookshelf.Model {
  get tableName() {
    return 'galleries';
  }

  get hasTimestamps() {
    return true;
  }

  users() {
    return this.belongsTo('User', 'user_id');
  }
}

module.exports = bookshelf.model('Gallery', Gallery);
